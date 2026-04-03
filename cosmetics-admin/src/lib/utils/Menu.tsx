type SubMenuItem = {
  label: string;
  href: string;
  permissionKey?: string;
};

export type MenuItem = {
  label: string;
  icon: string;
  href: string;
  permissionKey?: string;
  hasSubmenu?: boolean;
  submenuItems?: SubMenuItem[];
};

export const menuSections: { section: string; items: MenuItem[] }[] = [
  {
    section: "CAR MASTER",
    items: [
      {
        label: "Brand",
        icon: "car",
        href: "/brand",
      },
      {
        label: "Model",
        icon: "settings",
        href: "/model",
      },
      {
        label: "Body Type",
        icon: "settings",
        href: "/body-type",
      },
    ],
  },

  // {
  //   section: "POS SECTION",
  //   items: [
  //     {
  //       label: "New Sale",
  //       icon: "shopping-cart",
  //       href: "/new-sale",
  //       // permissionKey: "pos_new_sale",
  //     },
  //   ],
  // },
  // {
  //   section: "ORDER MANAGEMENT",
  //   items: [
  //     {
  //       label: "Orders",
  //       icon: "shopping-bag",
  //       href: "/orders",
  //       hasSubmenu: true,
  //       // permissionKey: "orders_menu",
  //       submenuItems: [
  //         { label: "All", href: "/orders" /* permissionKey: "order_list" */ },
  //         { label: "Pending", href: "#" /* permissionKey: "order_pending" */ },
  //         {
  //           label: "Accepted",
  //           href: "#" /* permissionKey: "order_accepted" */,
  //         },
  //         {
  //           label: "Processing",
  //           href: "#" /* permissionKey: "order_processing" */,
  //         },
  //       ],
  //     },
  //   ],
  // },

  // {
  //   section: "PRODUCT MANAGEMENT",
  //   items: [
  //     {
  //       label: "Categories",
  //       icon: "folder",
  //       href: "#",
  //       hasSubmenu: true,
  //       // permissionKey: "category_menu",
  //       submenuItems: [
  //         {
  //           label: "Category",
  //           href: "/category" /* permissionKey:"category_list" */,
  //         },
  //       ],
  //     },

  //     {
  //       label: "Product Setup",
  //       icon: "settings",
  //       href: "#",
  //       hasSubmenu: true,
  //       // permissionKey: "product_setup_menu",
  //       submenuItems: [
  //         { label: "Add New", href: "/add-new-item" },
  //         { label: "List", href: "/item-list" },
  //         { label: "Low Stock List", href: "/low-stock-list" },
  //         { label: "Product Gallery", href: "/product-gallery" },
  //         { label: "New Item Request", href: "/new-item-request" },
  //         { label: "Review", href: "/item-review" },
  //         { label: "Bulk Import", href: "/bulk-import" },
  //         { label: "Bulk Export", href: "/bulk-export" },
  //       ],
  //     },
  //   ],
  // },
  {
    section: "STORE MANAGEMENT",
    items: [
      {
        label: "New Stores",
        icon: "store",
        href: "#" /* permissionKey:"store_new" */,
      },
      {
        label: "Add Store",
        icon: "plus-circle",
        href: "/add-store" /* permissionKey:"store_create" */,
      },
      {
        label: "Stores List",
        icon: "list",
        href: "#" /* permissionKey:"store_list" */,
      },
    ],
  },
  {
    section: "SETTING & CUSTOMIZE",
    items: [
      {
        label: "Roles & Permissions",
        icon: "shield",
        href: "/roles/add",
        // permissionKey: "edit_user",
      },
      {
        label: "Users",
        icon: "users",
        href: "/users",
        // permissionKey: "user_create",
      },
    ],
  },
];
