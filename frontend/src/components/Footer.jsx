const Footer = () => {
  return (
    <footer className="py-4 sticky bottom-0 bg-white z-40">
      <p className="text-sm text-gray-600 text-center">
        Copyright © {new Date().getFullYear()} - Learn React Mongoose reserved
        by Kittipat SE NPRU
      </p>
    </footer>
  );
};

export default Footer;
