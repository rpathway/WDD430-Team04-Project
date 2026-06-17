'use client';

export default function Footer() {
  return (
    <footer className="bg-charcol px-4 pt-8 pb-8 text-subheading">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <span className="font-serif text-white text-lg font-bold block leading-none">Handcrafted</span>
          <span className="text-[10px] tracking-[0.2em] text-terracotta font-semibold">HAVEN</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs mb-8">
          {[
            { heading: 'About Us',
              links: [
                'Our Story',
                'Mission & Values',
                'Seller Guidelines'
              ]
            },
            { heading: 'Customer Service',
              links: [
                'FAQs',
                'Shipping & Returns',
                'Contact Us'
              ]
            },
            { heading: 'Policies',
              links: [
                'Privacy Policy',
                'Terms & Conditions',
                'Refund Policy'
              ]
            },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <p className="text-white font-semibold mb-3">{heading}</p>
              {links.map((l) => <p key={l} className="mb-1.5 hover:text-white cursor-pointer transition-colors">{l}</p>)}
            </div>
          ))}
        </div>

        <div className="border-t border-light pt-4 text-[10px] text-center text-subheading">
          &copy; 2024 Handcrafted Haven. All rights reserved.
        </div>

      </div>
    </footer>
  )
}