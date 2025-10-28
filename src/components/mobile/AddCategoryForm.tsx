import React, { useState } from "react";

interface Category {
  id: string;
  name: string;
  isSubcategory: boolean;
  parentId?: string;
}

interface AddCategoryFormProps {
  onClose: () => void;
  onAddCategory: (name: string, isSubcategory: boolean, parentCategory?: string) => void;
  categories: Category[];
}

export function AddCategoryForm({ onClose, onAddCategory, categories }: AddCategoryFormProps) {
  // Состояние для поля ввода названия категории/подкатегории
  const [categoryName, setCategoryName] = useState("");
  // Состояние для выбора типа: категория или подкатегория
  const [isSubcategory, setIsSubcategory] = useState(false);
  // Состояние для выбора родительской категории (если добавляется подкатегория)
  const [parentCategory, setParentCategory] = useState(""); // В будущем это будет список доступных категорий

  // Обработчик отправки формы
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAddCategory(categoryName, isSubcategory, isSubcategory ? parentCategory : undefined);
    setCategoryName("");
    setParentCategory("");
    onClose();
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Добавить категорию/подкатегорию</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Название:</label>
          <input
            type="text"
            id="categoryName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={isSubcategory}
              onChange={(e) => setIsSubcategory(e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-700">Это подкатегория?</span>
          </label>
        </div>

        {isSubcategory && (
          <div className="mb-4">
            <label htmlFor="parentCategory" className="block text-sm font-medium text-gray-700">Родительская категория:</label>
            <select
              id="parentCategory"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
              required
            >
              <option value="">Выберите категорию</option>
              {categories.filter(cat => !cat.isSubcategory).map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Добавить
          </button>
        </div>
      </form>
    </div>
  );
}
