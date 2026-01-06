import React, { useEffect, useState } from 'react'
import { useBlogOperatorContext } from '../context/BlogOperatorContext'
import { useFetchCreateBlogData } from '../hooks/useFetchCreateBlogData'
import { useCreateBlog } from '../hooks/useCreateBlog'
import BlogOperator from '../operator/BlogOperator'
import Loading from '../../ui/loading/Loading'

function BlogCreate() {
    const { blog, formatBlogData, setCategories, setBlog } =
        useBlogOperatorContext()
    const { mutate, isPending } = useCreateBlog()
    const { data, isLoading } = useFetchCreateBlogData()
    useEffect(() => {
        setBlog({
            title: '',
            subtitle: '',
            blog_category_id: '',
            meta_description: '',
            content: '',
            tags: '',
            reading_time: '',
            featured_image: '',
            is_featured: '0',
            is_published: '1',
        })
    }, [])

    useEffect(() => {
        if (!data) return

        setCategories(() => {
            return data?.categories.reduce((acc, current) => {
                acc.push({ value: current.id, label: current.category_name })
                return acc
            }, [])
        })
        console.log(data)
    }, [data])

    const handleSubmit = () => {
        const blogData = formatBlogData(blog)
        mutate(blogData)
    }

    return (
        <>
            {isPending && <Loading type="create" />}
            <BlogOperator handleSubmit={handleSubmit} type="create" />
        </>
    )
}

export default BlogCreate
