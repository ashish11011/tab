"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Mail,
    Phone,
    Calendar,
    Trash2
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getQueries, deleteQuery } from "@/lib/actions";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function QueriesPage() {
    const [queries, setQueries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fetchQueries = async () => {
        try {
            const data = await getQueries();
            setQueries(data);
        } catch (error) {
            toast.error("Failed to load queries");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQueries();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        setDeleting(true);
        try {
            await deleteQuery(deleteId);
            toast.success("Query deleted successfully");
            setQueries(queries.filter((q) => q.id !== deleteId));
            setDeleteId(null);
        } catch (error) {
            toast.error("Failed to delete query");
        } finally {
            setDeleting(false);
        }
    };

    const filteredQueries = queries.filter(q =>
        q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">User Queries</h1>
                <p className="text-muted-foreground">Manage leads and inquiries from your contact forms</p>
            </div>

            <div className="flex items-center gap-2 max-w-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search queries..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="border rounded-lg bg-white overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10">Loading...</TableCell>
                            </TableRow>
                        ) : filteredQueries.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10">No queries found</TableCell>
                            </TableRow>
                        ) : (
                            filteredQueries.map((query) => (
                                <TableRow key={query.id}>
                                    <TableCell className="font-medium">{query.name}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-xs">
                                                <Mail className="h-3 w-3" /> {query.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <Phone className="h-3 w-3" /> {query.phone}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`${query.slug.startsWith('/') ? '' : '/'}${query.slug}`} target="_blank">
                                            <Badge variant="secondary" className="hover:bg-secondary/80 cursor-pointer">
                                                {query.slug}
                                            </Badge>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(query.createdAt).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell className=" w-52 whitespace-break-spaces">
                                        <p className="text-sm " title={query.message}>
                                            {query.message}
                                        </p>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`mailto:${query.email}`}>
                                                <Button variant="outline" size="sm">
                                                    Reply
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => setDeleteId(query.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the query from the database.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteId(null)} disabled={deleting}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
                            {deleting ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
