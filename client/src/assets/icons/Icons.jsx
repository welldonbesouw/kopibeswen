export function HomeBlack({}) {
   return <i className="fi fi-sr-home text-[#6F4E37] text-xl -mb-1"></i>;
}

export function HamburgerSodaBlack() {
   return <i className="fi-sr-hamburger-soda text-[#6F4E37] text-xl -mb-1"></i>;
}

export function TreasureChestBlack() {
   return <i className="fi-sr-treasure-chest text-[#6F4E37] text-xl -mb-1"></i>;
}

export function UserBlack() {
   return <i className="fi-sr-user text-[#6F4E37] text-xl -mb-1"></i>;
}

export function UserPen() {
   return <i className="fi fi-sr-user-pen lg:text-3xl"></i>;
}

export function CreditCard() {
   return <i className="fi fi-sr-credit-card lg:text-3xl"></i>;
}

export function Interrogation() {
   return <i className="fi fi-sr-interrogation lg:text-3xl"></i>;
}

export function Globe() {
   return <i className="fi fi-sr-globe lg:text-3xl"></i>;
}

export function DocumentSigned() {
   return <i className="fi fi-sr-document-signed lg:text-3xl"></i>;
}

export function ShopLock() {
   return <i className="fi fi-sr-shop-lock lg:text-3xl"></i>;
}

export function CoffeeBeans() {
   return <i className="fi fi-sr-coffee-beans lg:text-3xl"></i>;
}

export function Cross({ className }) {
   return <i className={`text-3xl text-[#6F4E37] fi fi-sr-cross-small ${className}`}></i>;
}

export function RectangleList() {
   return <i className="text-xl fi fi-rs-rectangle-list text-[#6F4E37]"></i>;
}

export function RectangleListBlack() {
   return <i className="fi fi-ss-rectangle-list text-[#6F4E37] text-xl"></i>;
}

export function Tick() {
   return <i className="text-xl text-green-500 fi fi-bs-check"></i>;
}

export function CrossRed() {
   return <i className="w-10 text-xl text-red-600 fi fi-br-cross"></i>;
}

export function Loading() {
   return (
      <div className="animate-spin">
         <i className="fi fi-rr-loading"></i>
      </div>
   );
}

export function Edit() {
   return <i className="fi fi-sr-pen-square text-[#6F4E37] text-2xl"></i>;
}

export function Trash() {
   return <i className="fi fi-sr-cross-circle text-[#6F4E37] text-2xl"></i>;
}

export function EditIcon() {
   return <i className="text-2xl fi fi-bs-square-pen"></i>;
}
