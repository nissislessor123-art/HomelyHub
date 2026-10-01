import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BedDouble,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Coffee,
  Compass,
  FileText,
  Heart,
  Home as HomeIcon,
  House,
  Leaf,
  Map,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
  UserRound,
  Users,
  WalletCards,
  Waves,
  X,
  Zap,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperties } from "../store/Property/property-action";
import { propertyAction } from "../store/Property/property.slice";
import {
  addToWishlist,
  removeFromWishlist,
  logout,
} from "../store/User/User-Action";

const teal = "#0ABAB5";



const categories = [
  { label: "All stays", icon: Compass },
  { label: "Villas", icon: House },
  { label: "Apartments", icon: HomeIcon },
  { label: "Cabins", icon: Leaf },
  { label: "B&Bs", icon: Coffee },
  { label: "Resorts", icon: Waves },
  { label: "Heritage", icon: Sun },
];

const interests = ["Beach", "Food", "Nightlife", "Nature", "Adventure", "Shopping", "History", "Relaxation"];

const navItems = [
  { label: "Stays", href: "/stays" },
  { label: "Trip Genie", href: "/ai-trip-planner" },
  { label: "List your place", href: "/accomodationform" },
];

function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <span className={`flex h-9 w-9 items-center justify-center rounded-[11px] text-sm font-extrabold tracking-[-0.08em] transition-transform group-hover:rotate-[-6deg] ${light ? "bg-[#0abab5] text-[#06232d]" : "bg-[#0abab5] text-[#06232d]"}`}>hh</span>
      <span className={`text-[19px] font-extrabold tracking-[-0.04em] ${light ? "text-white" : "text-[#10232c]"}`}>HomelyHub<span className="text-[#0abab5]">.</span></span>
    </Link>
  );
}

function PrimaryButton({ children, onClick, className = "", type = "button" }) {
  return <button type={type} onClick={onClick} className={`primary-button inline-flex items-center justify-center gap-2 rounded-xl bg-[#0abab5] px-5 py-3 text-sm font-bold text-[#06232d] shadow-[0_10px_24px_rgba(10,186,181,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#28d2cc] active:scale-[.97] ${className}`}>{children}</button>;
}

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const displayName =
    user?.name ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "User";

  const initials = displayName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-[#dfe7e8]/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between px-5 lg:px-8">

        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`text-[13px] font-semibold transition-colors hover:text-[#0abab5] ${
                location.pathname === item.href.split("#")[0]
                  ? "text-[#0abab5]"
                  : "text-[#587078]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">

          {/* Wishlist */}
         
<Link
  to="/wishlist"
  className="icon-button"
  aria-label="Wishlist"
>
  <Heart size={18} strokeWidth={1.8} />
</Link>

          {!isAuthenticated ? (
            <>
              {/* NOT LOGGED IN */}
              <Link
                to="/login"
                className="px-2 text-[13px] font-bold text-[#587078] hover:text-[#0abab5]"
              >
                Log in
              </Link>

              <Link
                to="/signup"
                className="rounded-xl border border-[#dfe7e8] px-3.5 py-2 text-[13px] font-bold text-[#19333c] transition hover:border-[#0abab5] hover:text-[#087c7a]"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              {/* LOGGED IN USER */}
              <div className="relative">

               <Link
  to="/profile"
  className="flex items-center gap-2 rounded-full border border-[#dfe7e8] py-1.5 pl-2 pr-3 text-sm font-semibold text-[#19333c] transition hover:border-[#0abab5]"
>
  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e2f5f3] text-xs font-bold text-[#087c7a]">
    {initials}
  </span>

  <span className="max-w-[110px] truncate">
    {displayName}
  </span>

  <ChevronDown size={14} />
</Link>

                {profileOpen && (
                  <div className="dropdown-menu absolute right-0 top-12 w-56 rounded-2xl border border-[#dfe7e8] bg-white p-2 shadow-[0_18px_50px_rgba(13,43,53,.14)]">

                    <p className="px-3 pb-2 pt-2 text-xs font-bold uppercase tracking-[.14em] text-[#93a5a9]">
                      Account
                    </p>

                    <Link
                      to="/profile"
                      className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-[#28444d] hover:bg-[#edfafa]"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/profile"
                      className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-[#28444d] hover:bg-[#edfafa]"
                    >
                      Bookings
                    </Link>

                    <Link
                      to="/accomodation"
                      className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-[#28444d] hover:bg-[#edfafa]"
                    >
                      My accommodations
                    </Link>

                    <div className="my-1 border-t border-[#edf1f1]" />

                    <button
                      onClick={() => {
                        dispatch(logout());
                        setProfileOpen(false);
                      }}
                      className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[#ef6e60] hover:bg-[#fff3f0]"
                    >
                      Log out
                    </button>

                  </div>
                )}

              </div>
            </>
          )}

        </div>

        {/* MOBILE */}
        <div className="hidden">

          {isAuthenticated && (
            <Link
              to="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e2f5f3] text-xs font-bold text-[#087c7a]"
            >
              {initials}
            </Link>
          )}

          {!isAuthenticated && (
            <Link
              to="/login"
              className="text-sm font-bold text-[#587078]"
            >
              Log in
            </Link>
          )}

          <button
            onClick={() =>
              setMobileOpen((value) => !value)
            }
            className="icon-button"
            aria-label="Open menu"
          >
            {mobileOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>

        </div>

      </div>

      {mobileOpen && (
        <div className="border-t border-[#edf1f1] bg-white px-5 py-4 md:hidden">

          <div className="flex flex-col gap-1">

            {navItems.map((item) => (
              <Link
                onClick={() => setMobileOpen(false)}
                key={item.label}
                to={item.href}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-[#28444d] hover:bg-[#edfafa]"
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-[#28444d] hover:bg-[#edfafa]"
                >
                  Profile
                </Link>

                <Link
                  to="/wishlist"
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-[#28444d] hover:bg-[#edfafa]"
                >
                  Wishlist
                </Link>

                <button
                  onClick={() => dispatch(logout())}
                  className="mt-2 rounded-xl bg-[#ef6e60] px-3 py-3 text-center text-sm font-bold text-white"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="mt-2 rounded-xl bg-[#102d3a] px-3 py-3 text-center text-sm font-bold text-white"
                >
                  Log in
                </Link>

                <Link
                  to="/signup"
                  className="rounded-xl border border-[#dfe7e8] px-3 py-3 text-center text-sm font-bold text-[#19333c]"
                >
                  Sign up
                </Link>
              </>
            )}

          </div>

        </div>
      )}

    </header>
  );
}

function SearchPanel({
  compact = false,
  destination,
  setDestination,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
  onSearch,
}) {
  
  const navigate = useNavigate();

  
  const [focused, setFocused] = useState(false);
  return <div className={`search-panel relative z-10 flex w-full flex-col rounded-2xl bg-white p-2 shadow-[0_18px_55px_rgba(4,38,46,.24)] md:flex-row md:items-stretch ${compact ? "max-w-3xl" : "max-w-[980px]"}`}>
    <label className="search-cell flex-1" onClick={() => setFocused(true)}><MapPin size={18} className="mt-0.5 text-[#0abab5]" /><span><span className="search-label">Where to?</span><input value={destination} onChange={e => setDestination(e.target.value)} placeholder="Search by city or region" /></span></label>
    <label className="search-cell md:w-[190px]"><CalendarDays size={18} className="mt-0.5 text-[#0abab5]" /><span><span className="search-label">Check in</span><input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} /></span></label>
    <label className="search-cell md:w-[190px]"><CalendarDays size={18} className="mt-0.5 text-[#0abab5]" /><span><span className="search-label">Check out</span><input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} /></span></label>
    <label className="search-cell md:w-[165px]"><Users size={18} className="mt-0.5 text-[#0abab5]" /><span><span className="search-label">Guests</span><select
  value={guests}
  onChange={(e) => setGuests(e.target.value)}
>
  <option value="2">2 guests</option>
  <option value="3">3 guests</option>
  <option value="4">4 guests</option>
  <option value="5">5+ guests</option>
</select></span></label>
    <PrimaryButton
  onClick={onSearch}
  className="m-0.5 min-h-[58px] px-6"
><Search size={18} /><span className="md:hidden">Search stays</span></PrimaryButton>
    {focused && destination.length === 0 && <div onClick={() => { setDestination("Goa, India"); setFocused(false); }} className="absolute left-2 top-[calc(100%+10px)] w-[calc(100%-16px)] max-w-[350px] cursor-pointer rounded-2xl border border-[#e1eaeb] bg-white p-4 shadow-[0_18px_50px_rgba(13,43,53,.14)] md:left-3"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#9aaeb2]">Popular destinations</p><div className="mt-3 flex items-center gap-3 rounded-xl p-2 hover:bg-[#edfafa]"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#dff7f5]"><MapPin size={16} className="text-[#0abab5]" /></span><span><span className="block text-sm font-bold text-[#19333c]">Goa, India</span><span className="block text-xs text-[#71878d]">For a sunny reset</span></span></div></div>}
  </div>;
}

function CategoryRow({ active, setActive }) {
  return <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">{categories.map(category => { const Icon = category.icon; const isActive = active === category.label; return <button key={category.label} onClick={() => setActive(category.label)} className={`category-pill flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${isActive ? "border-[#0abab5] bg-[#dff7f5] text-[#087c7a]" : "border-[#dfe7e8] bg-white text-[#627980] hover:-translate-y-0.5 hover:border-[#a9dedd] hover:text-[#0c7776]"}`}><Icon size={16} strokeWidth={1.8} />{category.label}</button>; })}</div>;
}

function PropertyCard({ property, saved, onSave }) {
  const propertyId = property._id || property.id;

  const image =
    property.images?.[0]?.url ||
    property.images?.[0] ||
    "/assets/default-property.jpg";

  const name =
    property.propertyname ||
    property.propertyName ||
    "HomelyHub stay";

  const location =
    property.address?.city ||
    property.address?.area ||
    "Location unavailable";

  const price = Number(property.price || 0);

  const type =
    property.propertyType ||
    property.roomType ||
    "Stay";

  const rating =
    property.rating ||
    property.ratingsAverage ||
    "New";

  const reviews =
    property.reviews ||
    property.ratingsQuantity ||
    0;

  return (
    <div className="property-card group relative">
      <Link
        to={`/propertylist/${propertyId}`}
        className="block"
      >
        <div className="relative aspect-[1.18] overflow-hidden rounded-[18px] bg-[#dfe9e9]">

          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.045]"
          />

          <div className="absolute inset-x-3 top-3 flex items-center justify-between">

            <span className="rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-bold text-[#24434d] shadow-sm">
              {type}
            </span>

            <button
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onSave();
              }}
              className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition ${
                saved
                  ? "bg-white text-[#ef6e60]"
                  : "bg-[#102d3a]/35 text-white hover:bg-white hover:text-[#ef6e60]"
              }`}
              aria-label="Save stay"
            >
              <Heart
                size={17}
                fill={saved ? "currentColor" : "none"}
                strokeWidth={2}
              />
            </button>

          </div>

          <div className="absolute bottom-3 left-3 rounded-full bg-[#102d3a]/78 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-md">
            {property.maximumguest
              ? `${property.maximumguest} guests`
              : "HomelyHub stay"}
          </div>

        </div>

        <div className="pt-3">

          <div className="flex items-start justify-between gap-3">

            <div>
              <h3 className="text-[15px] font-extrabold tracking-[-.015em] text-[#19333c]">
                {name}
              </h3>

              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-[#71878d]">
                <MapPin size={12} />
                {location}
              </p>
            </div>

            <span className="flex items-center gap-1 text-xs font-bold text-[#19333c]">
              <Star
                size={13}
                fill="#0abab5"
                strokeWidth={0}
              />
              {rating}
            </span>

          </div>

          <div className="mt-3 flex items-baseline justify-between">

            <p className="text-sm text-[#637980]">
              <span className="text-base font-extrabold text-[#19333c]">
                ₹{price.toLocaleString("en-IN")}
              </span>{" "}
              / night
            </p>

            <span className="text-[11px] font-semibold text-[#9aaeb2]">
              {reviews} reviews
            </span>

          </div>

        </div>
      </Link>
    </div>
  );
}

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { properties, loading } = useSelector(
    (state) => state.properties
  );

  const { user, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [activeCategory, setActiveCategory] = useState("All stays");
const [searchDestination, setSearchDestination] = useState("");
const [searchCheckIn, setSearchCheckIn] = useState("");
const [searchCheckOut, setSearchCheckOut] = useState("");
const [searchGuests, setSearchGuests] = useState("2");
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  const savedIds = useMemo(() => {
    return (user?.wishlist || []).map((item) =>
      typeof item === "object" ? item._id : item
    );
  }, [user]);

const filtered = useMemo(() => {
  let result = properties;

  if (activeCategory !== "All stays") {
    const categoryMap = {
      Villas: ["villa"],
      Apartments: ["apartment", "flat"],
      Cabins: ["cabin"],
      "B&Bs": ["b&b", "bnb", "bed"],
      Resorts: ["resort"],
      Heritage: ["heritage"],
    };

    const keywords = categoryMap[activeCategory] || [];

    result = result.filter((property) => {
      const propertyType = String(
        property.propertyType || property.roomType || ""
      ).toLowerCase();

      return keywords.some((keyword) =>
        propertyType.includes(keyword)
      );
    });
  }

if (searchDestination.trim()) {
  const search = searchDestination
    .toLowerCase()
    .replace(/,/g, " ")
    .replace(/\bindia\b/g, "")
    .trim();

  result = result.filter((property) => {
    const city = String(property.address?.city || "").toLowerCase();
    const area = String(property.address?.area || "").toLowerCase();
    const name = String(
      property.propertyname || property.propertyName || ""
    ).toLowerCase();

    return (
      city.includes(search) ||
      area.includes(search) ||
      name.includes(search)
    );
  });
}

  return result;
}, [activeCategory, properties, searchDestination]);



  const handleWishlist = (propertyId) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (savedIds.includes(propertyId)) {
      dispatch(removeFromWishlist(propertyId));
    } else {
      dispatch(addToWishlist(propertyId));
    }
  };
  return <>
    <section className="hero-section relative overflow-hidden bg-[#102d3a] text-white"><div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" /><div className="hero-grid" />
      <div className="relative mx-auto max-w-[1240px] px-5 pb-28 pt-20 lg:px-8 lg:pb-32 lg:pt-28"><div className="max-w-[700px]"><div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[.19em] text-[#8de6e1]"><span className="h-2 w-2 rounded-full bg-[#0abab5]" /> Stays with a little more soul</div><h1 className="max-w-[720px] text-[clamp(3.2rem,7vw,6.2rem)] font-black leading-[.93] tracking-[-.075em]">Find a place<br /><span className="text-[#0abab5]">that feels yours.</span></h1><p className="mt-7 max-w-[470px] text-base leading-7 text-[#bad0d2] lg:text-lg">Thoughtfully hosted homes, design-led escapes, and the kind of welcome you remember after checkout.</p></div><div className="mt-12">
        <SearchPanel
  destination={searchDestination}
  setDestination={setSearchDestination}
  checkIn={searchCheckIn}
  setCheckIn={setSearchCheckIn}
  checkOut={searchCheckOut}
  setCheckOut={setSearchCheckOut}
  guests={searchGuests}
  setGuests={setSearchGuests}
  onSearch={async () => {
    const city = searchDestination
      .split(",")[0]
      .trim();

    const params = {
      limit: 1000,
    };

    if (city) {
      params.city = city;
    }

    if (searchCheckIn) {
      params.dateIn = searchCheckIn;
    }

    if (searchCheckOut) {
      params.dateOut = searchCheckOut;
    }

    if (searchGuests) {
      params.guests = Number(searchGuests);
    }

    dispatch(propertyAction.updateSearchParams(params));
    await dispatch(getAllProperties());

    document
      .getElementById("stays")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
/></div><div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-[#93b2b5]"><span className="flex items-center gap-2"><ShieldCheck size={15} className="text-[#0abab5]" /> Verified stays</span><span className="flex items-center gap-2"><Sparkles size={15} className="text-[#0abab5]" /> No hidden fees</span><span className="flex items-center gap-2"><MessageCircle size={15} className="text-[#0abab5]" /> Real human support</span></div></div>
    </section>
    <main id="stays" className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-20"><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p className="eyebrow">A better way to get away</p><h2 className="section-title">Stay somewhere<br /><em>worth staying for.</em></h2></div><button
 
  type="button"
  onClick={() => navigate("/stays")}
  className="inline-flex items-center gap-2 text-sm font-bold text-[#087c7a] transition hover:text-[#102d3a]"
>
  Explore all stays <ArrowRight size={16} />
</button></div><div className="mt-10"><CategoryRow active={activeCategory} setActive={setActiveCategory} /></div><div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{loading ? (
  <div className="col-span-full py-16 text-center text-sm font-semibold text-[#71878d]">
    Finding your stays...
  </div>
) : filtered.length === 0 ? (
  <div className="col-span-full py-16 text-center text-sm font-semibold text-[#71878d]">
    No stays found.
  </div>
) : (
  filtered.map((property) => {
    const propertyId = property._id || property.id;

    return (
      <PropertyCard
        key={propertyId}
        property={property}
        saved={savedIds.includes(propertyId)}
        onSave={() => handleWishlist(propertyId)}
      />
    );
  })
)}</div></main>
    <section className="mx-auto max-w-[1240px] px-5 pb-16 lg:px-8 lg:pb-24"><div className="trip-genie-banner relative overflow-hidden rounded-[26px] bg-[#e7f8f6] p-7 lg:p-12"><div className="trip-genie-shape" /><div className="relative max-w-[620px]"><span className="flex w-fit items-center gap-2 rounded-full bg-white/75 px-3 py-1.5 text-xs font-bold uppercase tracking-[.14em] text-[#087c7a]"><Sparkles size={14} /> Your personal travel sidekick</span><h2 className="mt-6 text-[clamp(2.4rem,5vw,4.4rem)] font-black leading-[.94] tracking-[-.07em] text-[#102d3a]">Meet Trip Genie<span className="text-[#0abab5]">.</span></h2><p className="mt-5 max-w-[455px] text-base leading-7 text-[#587078]">Tell us what you love, how long you have, and what you want to spend. We’ll stitch together an itinerary that actually feels like you.</p><Link to="/ai-trip-planner" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#102d3a] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#193d4b]">Plan my trip <ArrowRight size={16} /></Link></div><div className="absolute bottom-[-50px] right-[4%] hidden w-[390px] rotate-[5deg] rounded-[22px] bg-white p-4 shadow-[0_25px_55px_rgba(10,67,76,.16)] lg:block"><div className="rounded-[15px] bg-[#102d3a] p-5 text-white"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#7adcd8]">Your next escape</p><h4 className="mt-2 text-xl font-extrabold">A slow weekend in Goa</h4></div><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0abab5] text-[#102d3a]"><Compass size={20} /></span></div><div className="mt-6 flex gap-2"><span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold">3 days</span><span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold">Beach</span><span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold">Food</span></div></div><div className="flex items-center gap-2 px-1 pt-3 text-xs font-semibold text-[#607880]"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#dff7f5] text-[#087c7a]"><Check size={13} /></span> Built around your kind of happy</div></div></div></section>
    <section className="bg-[#f6f9f8] py-16 lg:py-20"><div className="mx-auto max-w-[1240px] px-5 lg:px-8"><div className="grid gap-8 md:grid-cols-3"><div><p className="eyebrow">How it works</p><h2 className="section-title text-4xl">The good stuff,<br /><em>made easy.</em></h2></div><div className="grid gap-7 sm:grid-cols-2 md:col-span-2 md:grid-cols-3"><div className="feature-step"><span>01</span><Compass size={24} className="mt-8 text-[#0abab5]" /><h3>Search your way</h3><p>Real places, real photos, and filters that understand what matters.</p></div><div className="feature-step"><span>02</span><ShieldCheck size={24} className="mt-8 text-[#0abab5]" /><h3>Book with ease</h3><p>Clear pricing, thoughtful hosts, and support when you need it.</p></div><div className="feature-step"><span>03</span><Sparkles size={24} className="mt-8 text-[#0abab5]" /><h3>Make it yours</h3><p>Save favourites, build itineraries, and come back to your places.</p></div></div></div></div></section>
    <Footer />
  </>;
}

function Footer() {
  return <footer className="bg-[#102d3a] py-12 text-white"><div className="mx-auto max-w-[1240px] px-5 lg:px-8"><div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-start"><div><Logo light /><p className="mt-5 max-w-[260px] text-sm leading-6 text-[#9ab6b9]">Stays for the curious, the calm, and the very much ready to go.</p></div><div className="grid grid-cols-2 gap-x-12 gap-y-8 text-sm sm:grid-cols-3"><div><p className="mb-3 text-xs font-bold uppercase tracking-[.15em] text-[#73d9d5]">Explore</p><Link to="/stays" className="footer-link">All stays</Link><Link to="/ai-trip-planner" className="footer-link">Trip Genie</Link><Link to="/wishlist" className="footer-link">Wishlist</Link></div><div><p className="mb-3 text-xs font-bold uppercase tracking-[.15em] text-[#73d9d5]">Host</p><Link to="/accomodationform" className="footer-link">List your place</Link><Link to="/accomodation" className="footer-link">Owner dashboard</Link><a to="#" className="footer-link">Host resources</a></div><div><p className="mb-3 text-xs font-bold uppercase tracking-[.15em] text-[#73d9d5]">Help</p><a href="#" className="footer-link">Help centre</a><a href="#" className="footer-link">Safety</a><a href="#" className="footer-link">Contact us</a></div></div></div><div className="flex flex-col justify-between gap-3 pt-6 text-xs font-medium text-[#77999d] sm:flex-row"><span>© 2026 HomelyHub. Made for better weekends.</span><span>Privacy · Terms · Accessibility</span></div></div></footer>;
}

export default function ManusHome() {
  return (
    <>
      <Header />
      <HomePage />
    </>
  );
}