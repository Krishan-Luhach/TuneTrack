"use client"
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import qs from 'query-string';
import Input from "./Input";
const SearchInput = () => {
  const [value, setValue] = useState<string>('');
  const deboundedValue = useDebounce<string>(value);
  const router = useRouter();

  useEffect(()=>{
    const query = {
      title: deboundedValue
    };

    const url = qs.stringifyUrl({
      url:'/search',
      query:query
    });

    router.push(url);
  },[deboundedValue,router]);
  return (
    <Input
    placeholder="What do you want to listen to ?" 
    value = {value}
    onChange={(e)=>setValue(e.target.value )}
    />
  )
}

export default SearchInput