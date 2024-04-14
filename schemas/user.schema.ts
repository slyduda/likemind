import { string, transform } from "valibot";
import { hashPassword } from "@/utils";

const UserPasswordTransformer =  transform(string(), hashPassword)