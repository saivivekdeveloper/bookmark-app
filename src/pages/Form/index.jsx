import React, { useContext, useState } from "react";
import { cn } from "../../lib/utils";
import { ApplicationContext } from "../../components/context";
import { toast } from "react-toastify";


function BookmarkForm({ onClose, editData, editSaveBookmark, mode }) {
  const {
    setState,
    state: { data },
  } = useContext(ApplicationContext);

  const MAX_LENGTH = 280;

  //form state
  console.log(editData, "editData in form");

  const [formData, setFormData] = React.useState({
    title: editData?.title ? editData.title : "",
    description: editData?.description ? editData.description : "",
    url: editData?.url ? editData.url : "",
    tags: editData?.tags ? editData.tags.join(",") : "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    url: "",
    tags: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  function isTagsCorrectFormat(tags) {
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const isValid = tagsArray.every((tag) => /^[a-zA-Z0-9]+$/.test(tag));

    return isValid ? tagsArray : false;
  }

  function handleSubmit(e) {
    e.preventDefault();
    //validation
    let valid = true;
    let newErrors = {
      title: "",
      description: "",
      url: "",
      tags: "",
    };
    if (!formData.title) {
      newErrors.title = "Title is required";
      valid = false;
    }
    if (!formData.description) {
      newErrors.description = "Description is required";
      valid = false;
    }
    if (!formData.url) {
      newErrors.url = "URL is required";
      valid = false;
    }
    if (!formData.tags) {
      newErrors.tags = "At least one tag is required";
      valid = false;
    }
    if (formData.url && !isValidUrl(formData.url)) {
      newErrors.url = "Please enter a valid URL";
      valid = false;
    }
    const tagsArray = isTagsCorrectFormat(formData.tags);
    if (formData.tags && !tagsArray) {
      newErrors.tags = "Tags must be alphanumeric and separated by commas";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }
    //submit form

    if (mode === "EDIT") {
      editSaveBookmark(formData);
    } else {
      setState((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          bookmarks: [
            ...prev.data.bookmarks,
            {
              id: crypto.randomUUID(),
              title: formData.title,
              description: formData.description,
              url: formData.url,
              tags: tagsArray,
              createdAt: new Date().toISOString(),
              lastVisited: null,
              visitCount: 0,
              isArchived: false,
              favicon:
                "https://www.google.com/s2/favicons?sz=64&domain_url=" +
                formData.url,
              pinned: false,
            },
          ],
        },
      }));

      setErrors({
        title: "",
        description: "",
        url: "",
        tags: "",
      });
      onClose();
      toast.success("Bookmark added successfully");
    }
  }

  console.log(data, "data");

  return (
    <div className="p-4">
      <h2 className="text-sm font-medium text-neutral-800 mb-8 dark:text-neutral-dark-100">
        Save a link with details to keep your collection organized. We extract
        the favicon automatically from the URL.
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit} id="bookmark-form">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="title"
            className="text-sm font-semibold text-neutral-900 dark:text-white "
          >
            Title <sup>*</sup>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            className={cn(
              "w-full p-3 rounded-lg border border-neutral-500 bg-white shadow-xs dark:border-neutral-dark-300 dark:bg-neutral-dark-600 dark:text-white hover:bg-neutral-dark-500",
              errors.title && "border border-red-800 "
            )}
            onChange={handleChange}
          />
          {errors.title && (
            <p className="text-red-800 text-xs">{errors.title}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-neutral-900 shadow-xs dark:text-white"
          >
            Description <sup>*</sup>
          </label>
          <textarea
            id="description"
            name="description"
            maxLength={MAX_LENGTH}
            value={formData.description}
            className={cn(
              "w-full p-3 rounded-lg border border-neutral-500 bg-white shadow-xs dark:border-neutral-dark-300 dark:bg-neutral-dark-600 dark:text-white",
              errors.description  && "border border-red-800 "
            )}
            rows={3}
            onChange={handleChange}
          />
          <p className="text-xs font-medium text-neutral-900 flex justify-end">
            {formData.description.length}/{MAX_LENGTH}
          </p>
          {errors.description && (
            <p className="text-red-800 text-xs">{errors.description}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="url"
            className="text-sm font-semibold text-neutral-900 dark:text-white"
          >
            Website URL <sup>*</sup>
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            className={cn(
              "w-full p-3 rounded-lg border border-neutral-500 bg-white shadow-xs dark:border-neutral-dark-300 dark:bg-neutral-dark-600 dark:text-white",
              errors.url && "border border-red-800 "
            )}
            onChange={handleChange}
          />
          {errors.url && <p className="text-red-800 text-xs">{errors.url}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="tags"
            className="text-sm font-semibold text-neutral-900 dark:text-white"
          >
            Tags <sup>*</sup>
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            className={cn(
              "w-full p-3 rounded-lg border border-neutral-500 bg-white dark:border-neutral-dark-300 dark:bg-neutral-dark-600 dark:text-white",
              errors.tags && "border border-red-800 "
            )}
            onChange={handleChange}
          />
        </div>
        {errors.tags && <p className="text-red-800 text-xs">{errors.tags}</p>}
      </form>
    </div>
  );
}

export default BookmarkForm;
