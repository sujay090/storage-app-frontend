import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#111318] text-slate-400 p-0 border-t border-slate-800">
            <div className="max-w-[1200px] mx-auto px-6 pt-[60px] pb-[40px] grid grid-cols-[1.5fr_2fr] gap-[60px] max-md:grid-cols-1 max-md:gap-10 max-md:p-[40px_24px_30px]">
                <div className="flex flex-col gap-4 max-[480px]:items-center max-[480px]:text-center">
                    <div className="flex items-center gap-3 text-[1.5rem] font-bold text-slate-100">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#00d4ff] drop-shadow-[0_0_10px_rgba(0,212,255,0.4)]">
                            <defs>
                                <linearGradient
                                    id="footerGrad"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="100%"
                                >
                                    <stop offset="0%" stopColor="#00d4ff" />
                                    <stop offset="100%" stopColor="#0072ff" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
                                fill="url(#footerGrad)"
                            />
                        </svg>
                        <span>IronCloud</span>
                    </div>
                    <p className="text-slate-500 text-[0.95rem] leading-[1.6] max-w-[280px]">Secure cloud storage for everyone</p>
                </div>

                <div className="grid grid-cols-3 gap-10 max-md:grid-cols-2 max-md:gap-[30px] max-[480px]:grid-cols-1 max-[480px]:gap-6">
                    <div className="max-[480px]:text-center">
                        <h4 className="text-slate-100 text-[0.875rem] font-semibold uppercase tracking-[0.05em] mb-5">Product</h4>
                        <Link to="/pricing" className="block text-slate-400 no-underline text-[0.9rem] py-2 transition-all duration-200 hover:text-[#00d4ff] hover:translate-x-1 hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.4)] max-[480px]:hover:translate-x-0">Pricing</Link>
                        <Link to="/" className="block text-slate-400 no-underline text-[0.9rem] py-2 transition-all duration-200 hover:text-[#00d4ff] hover:translate-x-1 hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.4)] max-[480px]:hover:translate-x-0">Features</Link>
                        <Link to="/" className="block text-slate-400 no-underline text-[0.9rem] py-2 transition-all duration-200 hover:text-[#00d4ff] hover:translate-x-1 hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.4)] max-[480px]:hover:translate-x-0">Security</Link>
                    </div>

                    <div className="max-[480px]:text-center">
                        <h4 className="text-slate-100 text-[0.875rem] font-semibold uppercase tracking-[0.05em] mb-5">Company</h4>
                        <Link to="/about" className="block text-slate-400 no-underline text-[0.9rem] py-2 transition-all duration-200 hover:text-[#00d4ff] hover:translate-x-1 hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.4)] max-[480px]:hover:translate-x-0">About Us</Link>
                        <Link to="/contact" className="block text-slate-400 no-underline text-[0.9rem] py-2 transition-all duration-200 hover:text-[#00d4ff] hover:translate-x-1 hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.4)] max-[480px]:hover:translate-x-0">Contact</Link>
                        <a href="mailto:support@maxhub.center" className="block text-slate-400 no-underline text-[0.9rem] py-2 transition-all duration-200 hover:text-[#00d4ff] hover:translate-x-1 hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.4)] max-[480px]:hover:translate-x-0">Support</a>
                    </div>

                    <div className="max-[480px]:text-center">
                        <h4 className="text-slate-100 text-[0.875rem] font-semibold uppercase tracking-[0.05em] mb-5">Legal</h4>
                        <Link to="/terms" className="block text-slate-400 no-underline text-[0.9rem] py-2 transition-all duration-200 hover:text-[#00d4ff] hover:translate-x-1 hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.4)] max-[480px]:hover:translate-x-0">Terms of Service</Link>
                        <Link to="/privacy" className="block text-slate-400 no-underline text-[0.9rem] py-2 transition-all duration-200 hover:text-[#00d4ff] hover:translate-x-1 hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.4)] max-[480px]:hover:translate-x-0">Privacy Policy</Link>
                        <Link to="/refund" className="block text-slate-400 no-underline text-[0.9rem] py-2 transition-all duration-200 hover:text-[#00d4ff] hover:translate-x-1 hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.4)] max-[480px]:hover:translate-x-0">Refund Policy</Link>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800 bg-[#0f1216]">
                <div className="max-w-[1200px] mx-auto p-6 flex justify-between items-center max-md:flex-col max-md:gap-5 max-md:text-center">
                    <p className="text-slate-500 text-[0.85rem] m-0">
                        © {currentYear} MaxHub Technologies Pvt. Ltd. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                            className="text-slate-400 transition-all duration-200 p-2 rounded-md hover:text-[#00d4ff] hover:bg-[#1e293b] hover:-translate-y-0.5"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="text-slate-400 transition-all duration-200 p-2 rounded-md hover:text-[#00d4ff] hover:bg-[#1e293b] hover:-translate-y-0.5"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <a
                            href="mailto:support@maxhub.center"
                            aria-label="Email"
                            className="text-slate-400 transition-all duration-200 p-2 rounded-md hover:text-[#00d4ff] hover:bg-[#1e293b] hover:-translate-y-0.5"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
