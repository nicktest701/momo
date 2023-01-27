import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllVouchersCategory } from "../api/categoryAPI";
import _ from "lodash";
import { getCategoryData } from "../config/getCategoryData";
export const useGetVoucherCategory = (category) => {
  const [categories, setCategories] = useState([]);

  const cat = useQuery(
    ["category", category],
    () => getAllVouchersCategory(category),

    {
      enabled: !!category,

      onSuccess: (categories) => {
        if (!_.isEmpty(categories)) {
          const options = getCategoryData(categories);
          setCategories(options);
        }
      },
      onError: (error) => {
        console.log(error.message);
      },
    }
  );

  return { categories, loading: cat.isFetching };
};
