import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useFetchSpecificBlog } from '../hooks/useFetchSpecificBlog';
import { useBlogOperatorContext } from '../context/BlogOperatorContext';
import BlogOperator from '../operator/BlogOperator';
import BlogOperatorSkelton from '../../skelton/BlogOperatorSkelton';
import { useEditBlog } from '../hooks/useEditBlog';
import Loading from '../../ui/loading/Loading';

function BlogEdit() {
    const { blogId } = useParams();
    const { setBlog, blog, setCategories, categories } =
        useBlogOperatorContext();
    const [isItitialized, setIsItitialized] = useState(false);
    const { mutate, isPending } = useEditBlog();

    const { data, isLoading, error } = useFetchSpecificBlog(blogId);

    useEffect(() => {
        setBlog({});
    }, []);

    useEffect(() => {
        if (!data) return;
        const blog = data?.blog;
        setBlog({ ...blog });

        setCategories(
            data?.categories.map((c) => ({
                value: c.id,
                label: c.category_name,
            })) ?? []
        );
        setTimeout(() => setIsItitialized(true), 0);
    }, [data]);

    const handleSubmit = () => {
        mutate(blog);
    };

    if (!isItitialized) {
        return <BlogOperatorSkelton />;
    }

    return (
        <>
            {isPending && <Loading type="edit" />}
            <BlogOperator handleSubmit={handleSubmit} type="edit" />
        </>
    );
}

export default BlogEdit;
