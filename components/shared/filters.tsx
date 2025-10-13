import React from "react";

import { Input } from "@/components/ui/input";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={1000} defaultValue={0} />
          <Input type="number" min={100} max={1000} placeholder="1000" />
        </div>
        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
      </div>
      <CheckboxFiltersGroup
        className="mt-5"
        title="Формат"
        limit={6}
        defaultItems={[
          {
            text: "Сырный соус",
            value: "1",
          },
          {
            text: "Моццарелла",
            value: "2",
          },
          {
            text: "Чеснок",
            value: "3",
          },
          {
            text: "Солённые огурчики",
            value: "4",
          },
          {
            text: "Красный лук",
            value: "5",
          },
          {
            text: "Томаты",
            value: "6",
          },
        ]}
        items={[
          {
            text: "Сырный соус",
            value: "11",
          },
          {
            text: "Моццарелла",
            value: "21",
          },
          {
            text: "Чеснок",
            value: "31",
          },
          {
            text: "Солённые огурчики",
            value: "41",
          },
          {
            text: "Красный лук",
            value: "51",
          },
          {
            text: "Томаты",
            value: "61",
          },
          {
            text: "Сырный соус",
            value: "12",
          },
          {
            text: "Моццарелла",
            value: "22",
          },
          {
            text: "Чеснок",
            value: "32",
          },
          {
            text: "Солённые огурчики",
            value: "42",
          },
          {
            text: "Красный лук",
            value: "52",
          },
          {
            text: "Томаты",
            value: "62",
          },
        ]}
      />
    </div>
  );
};
