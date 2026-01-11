import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '../../ui/table';
import { API_ENDPOINTS } from '../../../config/config';
import { useNavigate } from 'react-router';
import DeletionModal from '../../ui/modal/DeletionModal';
import { useFetchBlogs } from '../hooks/useFetchBlogs';
import { useBlogsContext } from '../context/BlogsContext';
import { useBlogOperatorContext } from '../context/BlogOperatorContext';
import SearchBlog from './SearchBlog';
import TableSkelton from '../../skelton/TableSkelton';
import { useDeleteBlog } from '../hooks/useDeleteBlog';
import ActionDropdown from '../../common/ActionDropDown';

function BlogTable() {
    const { setBlogs, setOriginalBlogs, blogs } = useBlogsContext();
    const { isModalOpen, setIsModalOpen } = useBlogOperatorContext();
    const navigate = useNavigate();
    const [selectedblog, setSelectedblog] = useState(null);
    const { data, isLoading, error } = useFetchBlogs();
    const { mutate, isPending } = useDeleteBlog();

    const handleAction = (action, id) => {
        console.log(id);

        switch (action) {
            case 'view':
                alert(`View details for blog ${id}`);
                break;
            case 'edit':
                navigate(`/blog/${id}`);
                break;
            case 'delete':
                setIsModalOpen(true);
                setSelectedblog(id);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (!data) return;
        setOriginalBlogs(data?.blogs);
        setBlogs(data?.blogs);
    }, [data]);

    if (isLoading) {
        return <TableSkelton />;
    }

    return (
        <div className="space-y-6">
            {isModalOpen && (
                <DeletionModal
                    setIsModalOpen={setIsModalOpen}
                    selectedData={selectedblog}
                    type="blog"
                    mutate={mutate}
                    isPending={isPending}
                />
            )}
            {/* Filter Section */}
            <SearchBlog blogCategories={data?.categories} />
            {/* Table Section */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Article
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Category
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Views
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Last Modified
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {blogs?.map((blog) => (
                                <TableRow key={blog.id}>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <div className="flex items-center gap-3">
                                            <img
                                                className="h-10 w-10 rounded-lg object-cover"
                                                src={`${API_ENDPOINTS.IMAGE.URL}/${blog?.featured_image}`}
                                                alt={blog?.title}
                                            />
                                            <div>
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90 line-clamp-1">
                                                    {blog?.title}
                                                </span>
                                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400 line-clamp-1">
                                                    {blog?.subtitle}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-[#e92929]/10 text-[#e92929]">
                                            {blog?.blog_category?.category_name}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${blog?.is_published == 0 ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'}`}
                                        >
                                            {blog?.is_published == 0
                                                ? 'inactive'
                                                : 'active'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {blog?.views}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <div className="flex -space-x-2">
                                            {blog?.updated_at &&
                                                new Date(
                                                    blog.updated_at
                                                ).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <ActionDropdown
                                            id={blog?.id}
                                            onAction={handleAction}
                                            type="blog"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default BlogTable;
