import { createContext, useContext, useState } from 'react'

export const BlogsContext = createContext()
export const useBlogsContext = () => {
    const context = useContext(BlogsContext)
    if (context === undefined) {
        throw new Error('useBlogsContext must be used within an BlogsProvider')
    }
    return context
}

export const BlogsProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([])
    const [originalBlogs, setOriginalBlogs] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedStatus, setSelectedStatus] = useState('all')

    const filter = () => {
        if (originalBlogs.length == 0 || !originalBlogs) return
        let filtered = [...originalBlogs]

        if (searchTerm !== '') {
            const term = searchTerm.toLowerCase()
            filtered = filtered.filter((blog) => {
                return (
                    blog?.title.toLowerCase().includes(term) ||
                    blog?.subtitle.toLowerCase().includes(term) ||
                    blog?.content.toLowerCase().includes(term) ||
                    blog?.tags.toLowerCase().includes(term)
                )
            })
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter((blog) => {
                return blog?.blog_category_id == selectedCategory
            })
        }
        if (selectedStatus !== 'all') {
            filtered = filtered.filter((blog) => {
                return blog?.is_published == selectedStatus
            })
        }

        setBlogs(filtered)
    }

    const value = {
        blogs,
        setBlogs,
        originalBlogs,
        setOriginalBlogs,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        filter,
        selectedStatus,
        setSelectedStatus,
    }

    return (
        <BlogsContext.Provider value={value}>{children}</BlogsContext.Provider>
    )
}
