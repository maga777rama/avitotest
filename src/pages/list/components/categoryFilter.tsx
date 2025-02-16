import { useState, useEffect } from "react";
import { Select, InputNumber, Button } from "antd";
import categoriesData from "../../../assets/categories.json";
import { AdType } from "../../form/types.ts";
const { Option } = Select;
import styles from "../styles.module.scss";

interface CategoryFilterProps {
    onFilterChange: (filter: any) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    onFilterChange,
}) => {
    const [selectedCategory, setSelectedCategory] = useState<AdType | null>(
        null,
    );
    const [filters, setFilters] = useState<any>({});

    useEffect(() => {
        onFilterChange(filters);
    }, [filters]);

    const handleCategoryChange = (value: AdType | null) => {
        setSelectedCategory(value);
        if (value) {
            setFilters({ type: value }); // Оставляем только выбранную категорию
        } else {
            setFilters({}); // Полный сброс при отмене выбора
        }
    };

    const handleFilterChange = (field: string, value: string) => {
        setFilters((prevFilters) => {
            const newFilters = { ...prevFilters };

            if (value === null || value === undefined || value === "") {
                delete newFilters[field]; // Удаляем фильтр, если поле очищено
            } else {
                newFilters[field] = value;
            }

            return newFilters;
        });
    };

    const handleResetFilters = () => {
        setSelectedCategory(null);
        setFilters({});
    };

    return (
        <div className={styles.filters}>
            <Select
                placeholder="Выберите категорию"
                onChange={(value) =>
                    handleCategoryChange(value as AdType | null)
                }
                value={selectedCategory}
                allowClear // Позволяет сбросить выбор
                style={{ width: 200 }}
            >
                <Option value={AdType.RealEstate}>Недвижимость</Option>
                <Option value={AdType.Car}>Авто</Option>
                <Option value={AdType.Service}>Услуги</Option>
            </Select>

            {selectedCategory === AdType.RealEstate && (
                <>
                    <Select
                        placeholder="Тип недвижимости"
                        onChange={(value) =>
                            handleFilterChange("propertyType", value)
                        }
                        value={filters.propertyType || undefined}
                        allowClear
                        style={{ width: 200 }}
                    >
                        {categoriesData.realEstateTypes.map((type) => (
                            <Option key={type} value={type}>
                                {type}
                            </Option>
                        ))}
                    </Select>
                    <InputNumber
                        placeholder="Площадь (м²)"
                        onChange={(value) => handleFilterChange("area", value)}
                        value={filters.area}
                        style={{ width: "100%" }}
                    />
                    <InputNumber
                        placeholder="Количество комнат"
                        onChange={(value) => handleFilterChange("rooms", value)}
                        value={filters.rooms}
                        style={{ width: "100%" }}
                    />
                    <InputNumber
                        placeholder="Цена"
                        onChange={(value) => handleFilterChange("price", value)}
                        value={filters.price}
                        style={{ width: "100%" }}
                    />
                </>
            )}

            {selectedCategory === AdType.Car && (
                <>
                    <Select
                        placeholder="Марка"
                        onChange={(value) => handleFilterChange("brand", value)}
                        value={filters.brand || undefined}
                        allowClear
                        style={{ width: 200 }}
                    >
                        {categoriesData.carBrands.map((brand) => (
                            <Option key={brand} value={brand}>
                                {brand}
                            </Option>
                        ))}
                    </Select>
                    <InputNumber
                        placeholder="Год выпуска"
                        onChange={(value) => handleFilterChange("year", value)}
                        value={filters.year}
                        style={{ width: "100%" }}
                    />
                    <InputNumber
                        placeholder="Пробег (км)"
                        onChange={(value) =>
                            handleFilterChange("mileage", value)
                        }
                        value={filters.mileage}
                        style={{ width: "100%" }}
                    />
                </>
            )}

            {selectedCategory === AdType.Service && (
                <>
                    <Select
                        placeholder="Тип услуги"
                        onChange={(value) =>
                            handleFilterChange("serviceType", value)
                        }
                        value={filters.serviceType || undefined}
                        allowClear
                        style={{ width: 200 }}
                    >
                        {categoriesData.serviceTypes.map((service) => (
                            <Option key={service} value={service}>
                                {service}
                            </Option>
                        ))}
                    </Select>
                    <InputNumber
                        placeholder="Опыт (лет)"
                        onChange={(value) =>
                            handleFilterChange("experience", value)
                        }
                        value={filters.experience}
                        style={{ width: "100%" }}
                    />
                    <InputNumber
                        placeholder="Стоимость"
                        onChange={(value) => handleFilterChange("cost", value)}
                        value={filters.cost}
                        style={{ width: "100%" }}
                    />
                </>
            )}

            <Button onClick={handleResetFilters} type="primary" danger>
                Сбросить фильтры
            </Button>
        </div>
    );
};
