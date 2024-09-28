function Footer() {
  const today = new Date();
  return (
    <footer className="bg-primary py-2 font-medium text-center text-white/[.9] text-sm">
      <p>
        &copy; <span>{today.getFullYear()}</span> WallPict. All rights reserved.
      </p>
    </footer>
  );
}
export default Footer;
