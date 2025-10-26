"use client";

import Link from "next/link";
import css from "./TagsMenu.module.css";
import { useState } from "react";

const tags = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];

const TagsMenu = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {open && (
        <ul onClick={toggle} className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
