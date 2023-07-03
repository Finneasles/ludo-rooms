import Link from "next/link";

export const Button = (props) => {
  return (
    <Link href={"/"} {...props} passHref>
      {props.children}
    </Link>
  );
};
