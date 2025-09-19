import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useFetchSpecificBlog } from '../hooks/useFetchSpecificBlog'
import { useBlogOperatorContext } from '../context/BlogOperatorContext'
import BlogOperator from '../operator/BlogOperator';
import BlogOperatorSkelton from '../../skelton/BlogOperatorSkelton';
import { useEditBlog } from '../hooks/useEditBlog';

function BlogEdit() {
      const {blogId} = useParams()
      const {setBlog, blog, setCategories, categories} = useBlogOperatorContext()
      const [isItitialized, setIsItitialized] = useState(false)
      const {mutate, isPending} = useEditBlog()
      
      
      const {data, isLoading, error} = useFetchSpecificBlog(blogId)

      useEffect(()=>{
            setBlog({})
      },[])

      useEffect(()=>{
            if(!data) return 
            console.log(data);
            const blog = data?.blog
            setBlog({
                  title : blog?.title,
                  subtitle : blog?.subtitle,
                  blog_category_id : blog?.blog_category_id,
                  meta_description : blog?.meta_description,
                  content :blog?.content,
                  tags : blog?.tags,
                  reading_time : blog?.reading_time,
                  featured_image : blog?.featured_image,
                  is_featured : blog?.is_featured,
                  is_published : blog?.is_published,
            })


            setCategories(()=>{
                  return data?.categories.reduce((acc, current)=>{
                        acc.push({value: current.id, label: current.category_name})
                        return acc
                  },[])
            })
            setTimeout(()=> setIsItitialized(true), 0)
            
      },[data])

      const handleSubmit = () =>{
            mutate(blog)
      }

      if(!isItitialized){
            return <BlogOperatorSkelton/>
      }

      return (
            <BlogOperator handleSubmit={handleSubmit} type="edit"/>
      )
}

export default BlogEdit