import { createContext, useContext, useState } from "react";

export const BlogOperatorContext = createContext()
export const useBlogOperatorContext = () =>{
      const context = useContext(BlogOperatorContext)
      if (context === undefined) {
            throw new Error('useBlogOperatorContext must be used within an BlogProvider');
      }
      return context;
}

export const BlogCreateProvider  = ({children}) =>{
      const [categories, setCategories] = useState([])
      const [isBlogOperationSuccess, setIsBlogOperationSuccess] = useState(false)
      const [blogSuccessMessage, setBlogSuccessMessage] = useState({})
      const [isModalOpen, setIsModalOpen] = useState(false)


      const resetBlogOperationMessage = ()=> {
            setIsBlogOperationSuccess(false)
            setBlogSuccessMessage({})
      }
      const [blog, setBlog] = useState({
            title : "",
            subtitle : "",
            blog_category_id : "",
            meta_description : "",
            content : "",
            tags : "",
            reading_time : "",
            featured_image : "",
            is_featured : "0",
            is_published : "1",
      })

      const handleInput = (e) =>{
            setBlog({...blog, [e.target.name]: e.target.value})
      }

      const handleSelect = (value, name)=>{
            setBlog({...blog, [name]: value})
      }
      const formatBlogData = (blogData)=>{
            const formData = new FormData()
            formData.append("title", blogData.title)
            formData.append("subtitle", blogData.subtitle)
            formData.append("tags", blogData.tags)
            formData.append("reading_time", blogData.reading_time)
            formData.append("meta_description", blogData.meta_description)
            formData.append("is_featured", blogData.is_featured)
            formData.append("is_published", blogData.is_published)
            formData.append("content", blogData.content)
            formData.append("blog_category_id", blogData.blog_category_id)

            if (blogData.featured_image instanceof File) {
                  formData.append('featured_image', blogData.featured_image);
            }
            
            return formData
      }

      const value = {
            blog,
            setBlog,
            handleInput,
            categories,
            setCategories,
            handleSelect,
            formatBlogData,
            isBlogOperationSuccess,
            setIsBlogOperationSuccess,
            blogSuccessMessage, 
            setBlogSuccessMessage,
            resetBlogOperationMessage,
            isModalOpen,
            setIsModalOpen
      }


      return (
            <BlogOperatorContext.Provider value={value}>
                  {children}
            </BlogOperatorContext.Provider>
      )
}