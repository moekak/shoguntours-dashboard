import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import FormatAlignLeftOutlinedIcon from "@mui/icons-material/FormatAlignLeftOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import ErrorMessage from "../../ui/error/ErrorMessage";
import Select from "../../form/Select";
import Radio from "../../form/input/Radio";
import TextArea from "../../form/input/TextArea";
import { API_ENDPOINTS } from "../../../config/config";
import Alert from "../../ui/alert/Alert";
import { useBlogOperatorContext } from "../../blog/context/BlogOperatorContext";
import { useCommonContext } from "../../../context/CommonContext";




function BookingOperator() {
      const {blog, setBlog, handleInput, categories, handleSelect} = useBlogOperatorContext()
      const {errorFields, errors, errorTitle, successMessage,isSuccess} = useCommonContext()
      const [isPreview, setIsPreview] = useState(false);
      const [preview, setPreview] = useState("")
      return (
        <div className="bg-gray-50 min-h-screen">
          {/* Main Content */}
          <main className="pb-10">
            <div className="container">
              {/* Page Header */}
              <div className="mb-8 sticky">
                <Breadcrumbs
                  aria-label="breadcrumb"
                  className="text-xs"
                  sx={{ fontSize: "0.75rem" }}
                >
                  <Link underline="hover" color="inherit" href="/">
                    Booking
                  </Link>
                  <Typography
                    sx={{ color: "text.primary", fontSize: "0.8rem" }}
                  >
                    Register New Booking
                  </Typography>
                </Breadcrumbs>
                <h1 className="text-2xl font-bold text-gray-800 mt-3">
                  Register New Booking
                </h1>
                <p className="text-gray-600 my-2">
                  Share your travel insights and stories with the world
                </p>
                {/* {errors?.length > 0 && (
                        <Alert
                        variant="error"
                        title={errorTitle}
                        message={errors}
                        showLink={true}
                        linkHref="/tours"
                        linkText="View all tours"
                        />
                        )}
                        {isSuccess && (
                        <Alert
                        variant="success"
                        title={successMessage?.title}
                        message={successMessage?.message}
                        showLink={true}
                        linkHref="/blogs"
                        linkText="View all blogs"
                        />
                        )} */}
              </div>

              {/* Form Sections */}
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#ecf3ff] rounded-lg flex items-center justify-center mr-3">
                      <InfoOutlinedIcon
                        sx={{ color: "#465fff", fontSize: 20 }}
                      />
                    </div>
                    Customer Information
                  </h2>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <Label
                          required={true}
                          htmlFor="tags"
                          error={errorFields?.has("tags")}
                        >
                          First Name
                        </Label>
                        <Input
                          value={blog?.tags}
                          name="tags"
                          type="text"
                          id="tags"
                          placeholder="John"
                          onChange={(e) => handleInput(e)}
                          error={errorFields?.has("tags")}
                        />
                        <ErrorMessage type="tags" />
                        <p className="text-xs text-gray-500 mt-1">
                          Separate tags with commas
                        </p>
                      </div>

                      <div>
                        <Label
                          required={true}
                          htmlFor="reading_time"
                          error={errorFields?.has("reading_time")}
                        >
                          Last Name
                        </Label>
                        <Input
                          value={blog?.reading_time}
                          name="reading_time"
                          type="number"
                          id="reading_time"
                          placeholder="Smith"
                          onChange={(e) => handleInput(e)}
                          error={errorFields?.has("reading_time")}
                        />
                        <ErrorMessage type="reading_time" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Image Section */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#ecf3ff] rounded-lg flex items-center justify-center mr-3">
                      <BrokenImageOutlinedIcon
                        sx={{ color: "#465fff", fontSize: 20 }}
                      />
                    </div>
                    Featured Image
                    <span className="text-red-600 text-xs">*</span>
                  </h2>

                  <div
                    className={` ${
                      errorFields?.has("featured_image")
                        ? "border-[#e7000b] hover:border-[#e7000b]"
                        : "border-gray-300 hover:border-[#465fff]"
                    } border-2 border-dashed  rounded-lg p-8 text-center flex items-center flex-col justify-center  transition-colors cursor-pointer h-[350px]  ${
                      preview == "" && blog?.featured_image == ""
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    <i className="fas fa-cloud-upload-alt text-5xl text-gray-400 mb-6"></i>
                    <p className="text-gray-600 font-medium mb-2 text-lg">
                      Upload featured image
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Drag and drop or click to select
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                      Recommended: 1200x630px (16:9 ratio)
                    </p>
                    <input
                      type="file"
                      id="featured_image"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageChange(e)}
                    />
                    <label
                      htmlFor="featured_image"
                      type="button"
                      className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Select Image
                    </label>
                  </div>
                  <div
                    className={`preview_container border-2 border-dashed border-gray-300 rounded-lg p-5 text-center hover:border-[#465fff] transition-colors cursor-pointer h-[350px] ${
                      preview !== "" || blog?.featured_image !== ""
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    <label
                      htmlFor="featured_image"
                      className="h-full block cursor-pointer"
                    >
                      {!(blog?.featured_image instanceof File) &&
                        blog?.featured_image && (
                          <img
                            src={`${API_ENDPOINTS.IMAGE.URL}/${blog?.featured_image}`}
                            alt=""
                            className="preview_src h-full w-full object-cover"
                          />
                        )}
                      {preview && (
                        <img
                          src={preview}
                          alt=""
                          className="preview_src h-full w-full object-cover"
                        />
                      )}
                    </label>
                  </div>
                  <ErrorMessage type="featured_image" />
                </div>

                {/* Content Editor with Preview */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#ecf3ff] rounded-lg flex items-center justify-center mr-3">
                        <FormatAlignLeftOutlinedIcon
                          sx={{ color: "#465fff", fontSize: 20 }}
                        />
                      </div>
                      Content Editor
                    </h2>

                    {/* Preview Toggle */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsPreview(false)}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                          !isPreview
                            ? "bg-[#465fff] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <EditIcon sx={{ fontSize: 16 }} />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsPreview(true)}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                          isPreview
                            ? "bg-[#465fff] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <VisibilityIcon sx={{ fontSize: 16 }} />
                        Preview
                      </button>
                    </div>
                  </div>

                  {!isPreview ? (
                    <>
                      {/* Editor Toolbar */}
                      <div className="bg-gray-50 p-4 rounded-t-lg border border-gray-300 flex flex-wrap gap-3 mb-0">
                        <button
                          type="button"
                          onClick={() => insertMarkdown("**", "**")}
                          title="Bold"
                          className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                        >
                          <i className="fas fa-bold"></i>
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown("*", "*")}
                          title="Italic"
                          className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                        >
                          <i className="fas fa-italic"></i>
                        </button>
                        <div className="border-l border-gray-300 mx-1"></div>
                        <button
                          type="button"
                          onClick={() => insertMarkdown("# ", "")}
                          title="Heading 1"
                          className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors font-semibold"
                        >
                          H1
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown("## ", "")}
                          title="Heading 2"
                          className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors font-semibold"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown("### ", "")}
                          title="Heading 3"
                          className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors font-semibold"
                        >
                          H3
                        </button>
                        <div className="border-l border-gray-300 mx-1"></div>
                        <button
                          type="button"
                          onClick={() => insertMarkdown("- ", "")}
                          title="Bullet List"
                          className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                        >
                          <i className="fas fa-list-ul"></i>
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown("1. ", "")}
                          title="Numbered List"
                          className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                        >
                          <i className="fas fa-list-ol"></i>
                        </button>
                        <div className="border-l border-gray-300 mx-1"></div>
                        <button
                          type="button"
                          title="Insert Link"
                          className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                        >
                          <i className="fas fa-link"></i>
                        </button>
                        <button
                          type="button"
                          //     onClick={insertImage}
                          title="Insert Image"
                          className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                        >
                          <i className="fas fa-image"></i>
                        </button>
                      </div>

                      {/* Editor Textarea */}
                      <textarea
                        id="content-editor"
                        value={blog?.content}
                        name="content"
                        onChange={(e) => handleInput(e)}
                        rows="25"
                        placeholder="Write your blog post content here using Markdown...    
                                                                              Examples:
                                                                              ## This is a heading
                                                                              **This is bold text**
                                                                              *This is italic text*
                                                                              - This is a bullet point
                                                                              1. This is a numbered list
                                                                              [Link text](https://example.com)
                                                                              ![Image alt text](image-url.jpg)

                                                                              > This is a blockquote

                                                                              ```javascript
                                                                              // This is a code block
                                                                              console.log('Hello World');
                                                                              ```"
                        className="w-full px-6 py-6 border border-gray-300 border-t-0 rounded-b-lg focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all resize-none text-base leading-relaxed"
                      />
                    </>
                  ) : (
                    /* Markdown Preview */
                    <div className="border border-gray-300 rounded-lg p-6 min-h-[600px] bg-white">
                      <div className="prose prose-lg max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({ children }) => (
                              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                {children}
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">
                                {children}
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-5">
                                {children}
                              </h3>
                            ),
                            p: ({ children }) => (
                              <p className="text-gray-700 mb-4 leading-relaxed">
                                {children}
                              </p>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold text-gray-800">
                                {children}
                              </strong>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc list-inside mb-4 space-y-2">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal list-inside mb-4 space-y-2">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="text-gray-700">{children}</li>
                            ),
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-4 border-[#465fff] pl-4 italic text-gray-600 my-4">
                                {children}
                              </blockquote>
                            ),
                            code: ({ inline, children }) =>
                              inline ? (
                                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-[#465fff]">
                                  {children}
                                </code>
                              ) : (
                                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                                  <code className="text-sm font-mono">
                                    {children}
                                  </code>
                                </pre>
                              ),
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                className="text-[#465fff] hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {children}
                              </a>
                            ),
                            img: ({ src, alt }) => (
                              <img
                                src={src}
                                alt={alt}
                                className="max-w-full h-auto rounded-lg my-4"
                              />
                            ),
                          }}
                        >
                          {blog?.content || "*Start writing to see preview...*"}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                  <ErrorMessage type="content" />
                </div>

                {/* Tags & SEO */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#ecf3ff] rounded-lg flex items-center justify-center mr-3">
                      <LocalOfferOutlinedIcon
                        sx={{ color: "#465fff", fontSize: 20 }}
                      />
                    </div>
                    Tags & SEO
                  </h2>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <Label
                          required={true}
                          htmlFor="tags"
                          error={errorFields?.has("tags")}
                        >
                          Tags
                        </Label>
                        <Input
                          value={blog?.tags}
                          name="tags"
                          type="text"
                          id="tags"
                          placeholder="tokyo, travel-tips, japan, culture (separate with commas)"
                          onChange={(e) => handleInput(e)}
                          error={errorFields?.has("tags")}
                        />
                        <ErrorMessage type="tags" />
                        <p className="text-xs text-gray-500 mt-1">
                          Separate tags with commas
                        </p>
                      </div>

                      <div>
                        <Label
                          required={true}
                          htmlFor="reading_time"
                          error={errorFields?.has("reading_time")}
                        >
                          Reading time
                        </Label>
                        <Input
                          value={blog?.reading_time}
                          name="reading_time"
                          type="number"
                          id="reading_time"
                          placeholder="5"
                          onChange={(e) => handleInput(e)}
                          error={errorFields?.has("reading_time")}
                        />
                        <ErrorMessage type="reading_time" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed Publish Button */}
              <button
                // onClick={handleSubmit}
                type="submit"
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#e92929] to-[#ff6b6b] text-white rounded-full hover:shadow-lg transition-all font-medium z-50 flex items-center justify-center"
              >
                <i className="fas fa-plus text-xl"></i>
              </button>
            </div>
          </main>
        </div>
      );
}

export default BookingOperator;
