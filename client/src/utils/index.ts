import { nanoid } from "@reduxjs/toolkit";

export const createId = () => "a" + nanoid();

export const createIds = (len: number) =>
  Array.from({ length: len }, () => createId());