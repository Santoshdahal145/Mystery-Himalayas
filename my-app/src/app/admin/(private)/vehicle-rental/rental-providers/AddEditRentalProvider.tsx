"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

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

import useRentalProviderHook, {
  RENTAL_PROVIDER_KEYS,
} from "@/hooks/tanstack-hooks/useRentalProviderHook";

import { z } from "zod";
import { SingleRentalProvider } from "@/types/rentalProvider";
import { requestAPI } from "@/utils";
import { rentalProviderApis } from "@/apis";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AddEditProps {
  visible: boolean;
  onClose: VoidFunction;
  rentalProviderId?: number;
}

const rentalProviderSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  logo: z
    .union([z.instanceof(File), z.string()])
    .refine((val) => val instanceof File || typeof val === "string", {
      message: "Please upload an image.",
    }),
  introduction: z.string().min(1, "Write introduction!"),
  address: z.object({
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    street: z.string().min(1, "Street is required"),
  }),
});

type FormValues = z.infer<typeof rentalProviderSchema>;

export default function AddEditRentalProvider({
  visible,
  onClose,
  rentalProviderId,
}: AddEditProps) {
  const { createProvider, updateProvider } = useRentalProviderHook();

  const { data: editData } = useQuery<SingleRentalProvider>({
    queryKey: [RENTAL_PROVIDER_KEYS.getSingle, rentalProviderId],
    enabled: !!rentalProviderId,
    queryFn: async () => {
      const response = await requestAPI(
        rentalProviderApis.getSingleRentalProvider(rentalProviderId!)
      );
      return response as SingleRentalProvider;
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(rentalProviderSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      logo: undefined,
    },
  });

  useEffect(() => {
    if (editData) {
      form.reset({
        name: editData.name,
        email: editData.email,
        phone: editData.phone,
        logo: editData.logo,
      });
    }
  }, [editData]);

  const onSubmit = async (values: FormValues) => {
    try {
      if (rentalProviderId) {
        await updateProvider.mutateAsync({
          id: rentalProviderId,
          data: values,
        });
      } else {
        await createProvider.mutateAsync(values);
      }
      onClose();
    } catch (err) {
      toast.error("Something went wrong!");
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
              <FormField
                control={form.control}
                name="introduction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Introduction</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a short introduction..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="border rounded-md p-4 mt-4 space-y-4">
                <h4 className="text-sm font-semibold mb-2">Address</h4>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="address.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street</FormLabel>
                        <FormControl>
                          <Input placeholder="Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

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
            <Button className="w-full mt-2" type="submit">
              {createProvider.isPending || updateProvider.isPending
                ? "Saving..."
                : rentalProviderId
                ? "Update"
                : "Add"}
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
