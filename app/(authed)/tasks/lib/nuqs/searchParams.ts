import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { PRIORITY, STATUS } from "@/lib/db/schema";

export const searchParamsParsers = {
  name: parseAsString.withDefault(""),
  status: parseAsStringEnum(Object.values(STATUS)),
  priority: parseAsStringEnum(Object.values(PRIORITY)),
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
