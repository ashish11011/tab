"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Pencil,
    Trash2,
    Search,
    ExternalLink,
    MapPin,
    ImageIcon
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
import {
    getPackages,
    deletePackage
} from "@/lib/actions";
import { toast } from "sonner";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function PackagesPage() {
    const [packages, setPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchPackages = async () => {
        try {
            const data = await getPackages();
            setPackages(data);
        } catch (error) {
            toast.error("Failed to load packages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this package?")) {
            try {
                await deletePackage(id);
                toast.success("Package deleted successfully");
                fetchPackages();
            } catch (error) {
                toast.error("Failed to delete package");
            }
        }
    };

    const filteredPackages = packages.filter(pkg =>
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Packages</h1>
                    <p className="text-muted-foreground">Manage your travel packages and itineraries</p>
                </div>
                <Link href="/admin/packages/add">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" /> Add Package
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-2 max-w-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search packages or locations..."
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
                            <TableHead>Package</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10">Loading...</TableCell>
                            </TableRow>
                        ) : filteredPackages.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10">No packages found</TableCell>
                            </TableRow>
                        ) : (
                            filteredPackages.map((pkg) => (
                                <TableRow key={pkg.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-20 rounded-md overflow-hidden bg-slate-100 shrink-0">
                                                {pkg.mainBannerImage ? (
                                                    <img
                                                        src={pkg.mainBannerImage}
                                                        alt={pkg.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center">
                                                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex max-w-sm flex-col">
                                                <span className="font-medium">{pkg.name}</span>
                                                <span className="text-xs text-muted-foreground line-clamp-1">{pkg.description}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-semibold">₹{pkg.price}</span>
                                            <span className="text-xs text-muted-foreground line-through">₹{pkg.strikeThroughPrice}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-sm">
                                            <MapPin className="h-3 w-3" />
                                            {pkg.location}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{pkg.slug}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/${pkg.slug}`} target="_blank">
                                                <Button variant="ghost" size="icon" title="View Public Page">
                                                    <ExternalLink className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={`/admin/packages/edit/${pkg.id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => handleDelete(pkg.id)}
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
        </div>
    );
}
