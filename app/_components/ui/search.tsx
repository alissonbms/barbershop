"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form";
import { Input } from "./input";
import { Button } from "./button";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, {
      message: "É necessário digitar 1 caracter pelo menos.",
    })
    .max(30, {
      message: "O máximo de caracteres permitidos são 30.",
    }),
});

const Search = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/barbershops/?title=${values.title}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row gap-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Buscar barbearias..."
                  {...field}
                  className="xl:py-5 xl:text-base"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="xl:py-5">
          <SearchIcon />
        </Button>
      </form>
    </Form>
  );
};

export default Search;
