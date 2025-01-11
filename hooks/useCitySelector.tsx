import { useState, useEffect } from "react";
import { FormInstance } from "antd";
import axios from "axios";
import { configUrl } from "@/config/configUrl";

interface City {
  city_id: string;
  province_id: string;
  province: string;
  type: string;
  city_name: string;
  postal_code: string;
}

interface UseCitySelectorOptions {
  provinceId: string | undefined;
  form: FormInstance;
}

export function useCitySelector({ provinceId, form }: UseCitySelectorOptions) {
  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);
  const [listCity, setListCity] = useState<City[]>([]);

  useEffect(() => {
    if (provinceId) {
      const fetchCities = async () => {
        try {
          const { data } = await axios.get(
            `${configUrl.rajaOngkirUrl}/city/?provinceId=${provinceId}`
          );
          setSelectedCity(undefined);
          form.setFieldsValue({ city: undefined });
          setListCity(data || []);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };

      fetchCities();
    }
  }, [provinceId, form]);

  return { selectedCity, setSelectedCity, listCity };
}
