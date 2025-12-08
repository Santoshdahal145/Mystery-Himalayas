"use client";

import SingleImagePicker from "@/components/ui/ImagePicker/SingleImagePicker";
import { Modal } from "@/components/ui/Modal";
import ModalHeader from "@/components/ui/Modal/ModalHeader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface AddEditProps {
  visible: boolean;
  onClose: VoidFunction;
  rentalProviderId?: number;
}

const rentalProviderSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  logo: z
    .union([z.instanceof(File), z.string()])
    .refine((val) => val instanceof File || typeof val === "string", {
      message: "Please upload an image.",
    }),
});

type FormValues = z.infer<typeof rentalProviderSchema>;

export default function AddEditRentalProvider({
  visible,
  onClose,
  rentalProviderId,
}: AddEditProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(rentalProviderSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      logo: undefined,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1200));

      toast.success(
        rentalProviderId
          ? "Rental provider updated successfully!"
          : "Rental provider added successfully!"
      );
      console.log("SEND TO API:", values);

      onClose();
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={visible} onClose={onClose}>
      <div className="flex flex-1 flex-col">
        <ModalHeader
          variant="with-title"
          title={
            rentalProviderId ? "Edit Rental Provider" : "Add Rental Provider"
          }
          onClose={onClose}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 mt-4 overflow-y-auto max-h-[70vh]">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Rental Provider Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+977-98XXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name="logo"
                render={({ field, fieldState }) => (
                  <SingleImagePicker
                    value={field.value}
                    onChange={(file: File) => field.onChange(file)}
                    onRemove={() => field.onChange(undefined)}
                    label="Logo"
                    id="logo"
                    errorMsg={fieldState.error?.message}
                  />
                )}
              />
            </div>
            <Button className="w-full mt-2" disabled={loading}>
              {loading ? "Saving..." : rentalProviderId ? "Update" : "Add"}
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
