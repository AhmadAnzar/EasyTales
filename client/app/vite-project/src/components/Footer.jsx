import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">
          
            EasyTales
          </h3>
          <p className="footer-description">
            Collaborate, create, and share stories with the world.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/write">Write</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Community</h4>
          <ul className="footer-links">
            <li>
              <Link to="/guidelines">Guidelines</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Connect</h4>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Twitter">
              <img className="twitter" src="https://images.freeimages.com/image/large-previews/f35/x-twitter-logo-on-black-circle-5694247.png?h=350" alt="" />
            </a> 
            
            <a href="#" className="social-link" aria-label="Discord">
              <img className="linkedin" src="https://static.vecteezy.com/system/resources/previews/018/930/480/non_2x/linkedin-logo-linkedin-icon-transparent-free-png.png?h=350" alt="" />
            </a>
            <a href="#" className="social-link" aria-label="Discord">
              <img className="instagram" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlwMBEQACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAQUGBwIDBAj/xABMEAABAwMABQYJBQ0HBQAAAAABAAIDBAURBhIhMWEHE0FRcYEUIiORobGywdEyQkNSkhUXJCUzVXN0k6KjwuE0NVNUZHKCFkRiY/D/xAAbAQABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EADgRAAIBAwICBgkDBAIDAAAAAAABAgMEERIxBSETQVFSobEUFSIyQmFxkdEzgcEjJHLwBvE0YuH/2gAMAwEAAhEDEQA/ALxQAIAEACABACZ2oAYrtpfZbUSyoq2vmH0UIL3Z442DvwrdGyr1ucY8vnyGSqRj1kVruU/xiLfbMt6Hzy/yge9aFPg/XOf2QzpexDRPyiX6Q+TNLEOjVizjzlWI8Kt1vliqbZzf9d6SZz4e3s5iP4Jz4dbd3xZIsnRByiX+MjnHUsw6daHBPmIUUuGW72ySKOR2oeVB2sG3C1jV6XwS/wApHvVafCse7L7of0WdiVWrTKx3NzY4awRTHdHONQnsJ2HuKo1bStT5tcvkMlTlHqH8HKrDBUACABAAgAQAIAEACAEyEAMekek9vsDMVDzJUuGWU8Zy49vUOJVm2tKlw/Z27QbwVhftLrrei9j5jT0p2eDwnAxxO93q4LoLewo0OeMvtf4K8nJkfxjcFeyMUBUmSSMBE0kUQTSaMRDuTWTxiImslURDt3phNFD7YNLbtZC1kE/O0o30821uOB3ju8yqV7WlV5vk+0SdvCaLR0Z0tt2kADIncxVgZdTSHxu0H5wWPXtp0Xz27SlVoTp77EhVcgBAAgAQAIAEAITgIAhOmumjbY59Bay19djEkh2th+LvUtGzsel9ufu+ZLCk2ssq+aWSeV8sz3Pkecue45JPXlb8UorC2B0zBPyR9GIjInRggeoCJMkigCa2SqBjlNbJVAE1sljERNZKogmkiiEb3xytlie5kjDlr2nBaeBTGk1zJFHKwy0dB9ORXlltvDmtq90U24TcD1O9aybq00e3DbyM26stC1w2J8qBnAgAQAIAEAQ7T3Sk2em8CoXjw+ducg/kW/W7T0edXrK16WWqXuotW9u6ntPYqYkuJLiSSckk5JK3k8IvSpiJ2SF0zdSUtTXTiCjgknlPzY26x/oklUhBZk8IjlBLcktJyfX6oaHSx09MCN0suSPs5VOXE6Edssic4I7W8mVzPy6+kHYHH3KJ8Wh1RYnSx7DP72Ff+c6b9m74pPWsO6/D8C9PHsD72Ff+c6b9k74pHxWPdfh+ByuY9gh5L6/85U37J3xSetId1+A/0uPYYO5MbmPk19I48WuHuKT1nDuseryHYcNZyd36BpdE2nqMdEUuCftAKSPEKL35E0Lyi9+RGK2jqqCbmK6nkp5fqyN1c9nX3KzGcZrMXkvU3GazF5Oc70EqiJ3pCVRLa5PNLDdYRbbjLmuhbljz9Mz4jp8/Wsi7t+jeqOxhX9n0T6SHuvwZOFSM0EACAG++XOGz2yeun2tibsbna9x2Bo7Sn06bqSUUS0aUqs1CPWUXXVk9fWTVdU/XmmdrOPuHBdDTShFRXUdFGjGEVGOyNCk1DXTHjRewT6QXAQRnUgYA6eXHyR1DiejvUNxcqjHPX1FS4mqMcvcuK2W2gstGIaOJkMTRl7ydruLj0rBqVJ1ZapPLMiUpTeWNFfp7YaN5Y2ofUuGw+Ds1h593pU9OxrTWcY+pPGzrS54wNj+VC2A+Jbbg7jiMfzKZcNqd5eP4JVw+p2rx/BgeVCg/Ndb9pnxS+rZ95eP4Herp95eP4E++jQ/mut+0z4o9Wz7y8fwL6tn3l4/gX76NB02ut+0z4pPV0+8vH8B6sn3l4/gybyoWwnxrbXjiObP8yT1dPvLx/AerKnVJeP4HGh5QLBVuDHzyUrj/AI7MDzjICinZVo7LP0I58Prx5pZ+g919uoL1QmGrijnp3jLSDnHFpG7tCrwnKnLMXgq06k6UsxeGU1pdo3No7cBE5xkpZcmCXG8D5p4j+q2re4VaPzR0dpcK4hnrW4xKcvKJtpKmajq4aqlfqTwvD2O6iE2SUlpewsqcZxcZLky+tG7vFe7RBXQ4Be3EjPqPG8LBq03Tm4s5C5oOhVcGOajIBCgCruVK7mouEVrid5OmHOSgHe8jYD2D2lpWUFFOb6zoOE22Kbqvr/ggyv6jVcAOwEncE5MZ0ZdGgtrba9HabLcTVDeflJ35cNg7hgLEuqvSVW+w5e9q9JWeNlyRCeUTSKWuuElqppMUdO7VlDT+UeN+eA3Y6wVes6ChHXLdmnYWajTVSS5vyIar+o0OjBLqE6MTCNQ7ow3I1C9GIRsSZHKAsUUk8rIomOfI9waxrd7idgCbKSSywaUVl7E5PJjX+BGQ3CDwrGeZ5s6vZrZ9OFR9YR1e7yMtcWp68aXjtOTQK/VVkvLbPXF7aWWQxOjefyMuejgTsPRuPat1SjVh0kd/Mmv7WNal00N9/qiwNNLSLvo7VQBoM0bedhJ6Ht2+naO9Z9vU6OomY1lW6GvGXV1/QosbQD1rdOx0iFIO0k35KrwaS7y2yR2IawFzOEgHvGfMFRvqeYa1ujI4zba6SqrdeRbg3LLOZMJpGxRPkkOGMBc49QCNxUnJ4RQNfVyXCtnrJflzyF54Z3DuGB3LXj7K0o7ylQVKCprZcjnwn6hzgKyISyRxHdI8MPece9LrwsjJLTFy7D0G4CGAkAYY3d2BYu7OE3Z58mkM08spOTI9zyesk5K3E8JI7mNJRio9hgl1B0ZvoqOor6llNRwvmnf8ljB6T1Dih1FFZYyo4Uo6pvCJ7aOTQOY194rHax2mKmwAO1xG3zKjUvuqC/dmHW4vzxSj+7/A9/e70d1ceDz5+t4Q/PrUXptbt8Cr60uc7r7IZ7vyZx8259orXh43RVO0HhrAZHmKkhfNe+i1R4w9qsf3X+/ghMTazRy+wSVlK5s1LKHmN2zWHA7jnoKuSlGrTai9zYcYXVB9G+TRbB020f8AAvCfujHjGea+kz1au/Ky/RqucYOa9WXWvRof16vuU5d651fdKu4taYnyymVoB2t6u/ctSEdMFA6yhbqnSjSfPCwegKeQT0sUmBiRgdjtCxZcmcPJaZNHnithFPW1MA3RTPYO5xC3IyzFM7yj7VOMu1LyNCdkl0m6jqZKKsgq4fykEjZG9oOfcmyWqLTG1KSqQcH18vueh6Spjq6WCpiIMc0bZGkdIIyFhtYeGcBOLhJxe6GjTipNJorcHtOHPYIh2vIb70+kszRd4XS6W8hF9uftzKX1eCvazucBqpdQaTdb261xpB/qI/aCJS9lkVeOKU38n5F8VpxRznqjd6lmrc8/prM19Tz7EPJs7AtVz5nokoc2Zsjc97WMaXOcQA0byTsASaxskoptlzaH6PQ2G2ta9rXVsoDp5OP1RwH9VQrVXUl8jiL+9d1Vz8K2/wB7Rq0m07gtkz6S2xtqqlhIe8nybD1cT2edOp27lzlsW7Hg068VOo9MfFkWPKBpDzmtzlJjPyOY2evPpVj0eljrNf1Ja4xz+/8A8JNo3p9DcJ46O6xNpqh5AbKw+SeerbtafP2qCrb6ecdjKveDToxdSk8rxHvSnR6n0gt7onNa2pYCYJsbWHq7D0hR0arpyz1FCxvJWtRSW3WikpYpIZXxTMMcrHFr2ne0jeFqKWeaO3jpklKLyma3DxT2JykPS5noGznNnoT/AKeP2Qsae7PPq6xVkvmyib8Px7ch1Vc3tla9N+wvod3ar+3p/ReRwFSZLGBMIFwXdyeVXhWiVCTviBiP/EkD0YWTcRxVZw/FqfR3k128/uaeUl2NHNX687B7/cmU3iRY4Es3n7MqzV4KfUdpgTVRrDBvtzfxlR/rEftBI58mRXC/oz+j8mXjX/2Go/RO9RVVbnndL9SP1RQMTfJM/wBoVxz5npkorLJHoHRNq9KaYPGWwtdNji3AHpITJzekyOM1HSs5Y68L7/8ARYumVxfatH6meF2rM7EUZHQ5xxnu3qCCzLmcrwy2VxdRhLbd/sUzq/8AxVzWd9pELU7WGkRzR0pVMTBcmglyluejkElQ4umiJhe4na7V3E8cYVKrFKXI4Xi1sre6lGOz5/cr/lHoRS6UTSMGGVMbJf8Al8k+yD3q1Qn7GOw6LglR1LRJ/C2v5Iq8eKexTqXM11HmX7ZP7moP1aP2QsyW7POrn9af1fmUZfh+Prn+uTe2VqU37CO+tF/b0/8AFeRwFSJlnAiXIYLZ5JHudo7UMJ2MrHAcAWMPrys67/Uycd/yGKV1F9sV5s7eUdpdYGHqnb71Xi8DeAvF3+zKz1Uuo7LImqjULk329n4ypP07PaCTUQ3L/oz+j8mXTX/2Gp/RO9SaeeUv1I/VFExM8kzZ80J0p8z0uUubJRydPbDpO3WP5SnkjHblp/lSa88jE46tVny6mn5r+SX8odM6p0blMe0wyMkI4A4PrQnjmYPBKqp3kU+tNFU6qXpDujHVT1UAQtS6wZanJrTPg0c5x4I5+Z729m73Jk3lnEceqKd3hdSS/kivKdM2XSFkTd8VO3W7ySpKbwjZ/wCPwatXLtf4Ic9vinsU0Zm6ty+bJ/c1B+rR+yFTlueb3P68/q/Mo++jN9uf65N7ZWjCXso9As1/bU/8V5HAQpEyzgxITshgtXkkb+Iaw9dYR+4xUbt+2jjv+Rf+TFf+q82PenMBm0aqcDJjLH+Zwz6MqqUuET0XkfnleBV2oo9R2uoObTdQajfQR4r6U/8AuZ7QQpcyKu/6Uvo/IuOtGaOcdcbvUpXscBS9+P1RSTIvEb2Kq58z0bVzN9DNJQVsFXD8uF4eOON47xkJFVwyGvTjWpSpy2aLfpZ6a625srNWSnnj2tO3Yd4PqKtpqSycDUp1KFVxfKSK30i0RrLbM+SjikqaMnLSwazmDqcPeopqS2OusOMUq8VGo9MvBkc5t2capz1Y2piqGx0ixnI/aP6I1t2ma6pjkpqP50jxqucOpo96mhky77jFK3i1B6peC+pZ0slJaLfrO1Yaanj6Nga0DYAns42MalxVwucpMpe61klzuVRWygh079bVPQNwHcAAhTPQ7WgrejGkur/WcTmeKVLGRYL0swxZ6EdVPH7IUTPNbn9af1fmUlex+Orkeusm9sq7F8keh2a/tqf+K8kcBapVIs4McJyYYLf5M6fmNFYX6uDPK+Q8duB6GhUbh5mcJx2prvZLsSRJK+nbV0U9M7dKws84UO5mUqjp1IzXU0yojC5ri14w5pw4dR6VUcsHdxmmk0LzabqF1GcDNWoid1PafSm6uZHVeYNfJluzDXgeB85pHoV57HCx5SRT3M6uzG5ZTmd8p5WTExKNzF1Dpo/e6myzENHO0zzl8WenrHUU+ldOm/kUL6whdrO0l1/kn9tvluuIbzFQwPP0ch1XDu+C0adxTnszl69lXoP248u3qHDUizrarM9eApeRWy9hvuV8t1taTU1TA8fRsOs89ybKrCO7LNvZV679iP79RXWk2kVTfJBHqmKkYcsi6Set3H1KtKtqfI6zh3DYWi1PnL/dhgLE6MzWTNUo1Y3O6ACVPCQ5PmXrQxmKgp4zvZE1p7gE881rS1VJS7WyjbkecuNZJv16iRw73EqwpHpFssUIL5LyOUtUikTmGo4nDRlxOGjrKemDaXN7F82Si+51ooqPphhawnrONp8+VSk8ybPM7qt01edTtbO07k0gK+0qt5pbs+Ro8Scc43Z09I8+3vVKutMjqeGXHSUFF7x5fgaWxcFXci+5GXNbMKNyG6iyrXU+FW+CYEEuYNbtGw+la1OWuKZx1em6dWUPmQS+W40VymZq4je4vj7D8Nyx7mLpzaZ01lcqrRT61yY2uh4KpKZdUzW6LgonUHqRpfFnYRsTelJFIQ85q6vOSY6tYqSNZ9oijDOcGnmgNwAU8ZkikYuYp4zHqRrLOCsRmOydthtT7pd6enDSYw4PlPQGDfnt3d6tU22yrf3St7eU+vZfVlrXatbb7ZU1b9gijLhxPQPPhWTiLek61WNNdbKQ1T07T0pykekLlyRgWqVSHpj3oTa/ulpDAHNzDTeXk6th8UefHmKWUsIy+M3Xo9o8by5L99/AuQblXOCBADVpDbvuhQlrG5mj8aP3jvUNeGuPLct2Vx0FXL2e5CGx9ayXI6VyNgiUbkN1j5o7X+CONNMcQvOWn6rvgrVpcqD0S2ZlX9DpF0kd0SCvoYLhBzc7c9LXDe3sWhVoxqx0yMujXnRlqgRyp0WqWn8Hljkb/wCXilZVXhtX4Gma9PisH76x4nG/Ru5dFOD2SN+Kqy4dc9UfFFiPE7ft8DQ7Rq6f5X+I34qJ8Ouu75Eq4nbd7wZgdGLt/lP4jfinR4fdL4fIcuJ23e8GYnRe7HdSfxG/FWI2Vwvh8RVxW273gzH/AKTvB/7Vo7ZG/FTxtK3YL62tV8XgzfTaEV8p/CpoYWdOqS93uCtQtZ/EyKpxylH3E34Ewstno7RTmKmb4ztr5HfKf2q7CCguRgXV3Vup6p/bsIdp1fW1jhbqN+tDG7Mzxuc4bgOA9aZKotkb/BrB0/69Rc3t+SGOaiMjo0zW4KZSHZLW0Hsv3JtOvM3FTUkSSA72job3eslLJ5OG4te+lV/Z92PJfyySJplggAQBGL9a+alNVC3ybtrwPmnrWXeUXF647GtZXWV0cn9BrbGOpZrZfcjYIkxsbqHCiuFRSgMPlIxua7eOwqxRvqlLk+aKda2hUedmOkd7piPKNkZ3ZV+PFKL97KKcrOotuZs+7FF/in7B+Ck9Y23e8GM9FrdgG8UA+n/cd8EesbbveD/Avolbs8jE3u3jfP8AuO+CX1jbd7wYvodd/D5GJv1tG+o/cd8Evp9v3vMX0G47vkYO0ktTd9Q49kbj7kvp1DtHLh9y/h8UclRpbb4weaZPKejDdUelI72n1cyaHCa8t8LxI1edJa64MdDHimhOwtYcuI4n4YUUrmU+S5GvacLo0Xql7TI45mOhEZGymaXsU0ZEiZJdCdHjXVTa+qZ+DQu8m0/SPHuHrViBicY4h0UOgpv2nv8AJFkgYTzkxUACABAGL2Nc0tcAQdhB6UjSawwXJ5RHq+2mmeXxbYT+6sS7tXSeqOxqULrWsS3OZrFntk7kbBGmsTUJzabgNRg6LZuTGhymaHwjqCbpJFM0PiHUhIkUjmkiUiJoyOd8fBTRJoyOd8fBTRZKmaHsU8WSJmh7VPFkqkOujujsl3lEs4cyjafGd0ycB8VbowcubM+/4lG3i4R5y8iyIIY4IWRQsDGMaGtaNwCuHJylKbcpbs2IGggAQAIAEAI4ZGDuSNZ3Abaq24y+n72/BZVzw/4qX2LdO56pnDqlpLXAgjoWQ04vD3LWc80JhJgMgQMJGgyansCaSRZzSMQSxkcz2JUSxZzyMT0TxZyvYpUyVM082ZHBjGlz3bmgZJU8Mt4RI5qKyyQWfRQvLZrmMNzkQA7/APcfctOhatc5mTdcW+Gh9/wS+NjY2BjGhrWjAAGAArxhttvLMkCAgAQAIAEACABAAgDVNBHMMPZnj1KGrQp1ViSHRnKOxxS24j8k/PByzanDHvTf3LEbnvI5X007PlRu7RtVGdpWhvEmVWD2ZoeMbDsPFVmmtyZM0PATeRImc72knDRk8E6KbfIlUktwZbquc+Tp34PSRgelWoWtae0RHc0obyOuDRp78GqmDR9VgyfOr9Lhz3myCfE8e4vuPdDbqWhaRTwhpO9x2k960adGFNYijOq16lX32deApSEVAAgAQAIAEACABAAgAQAIAEACAMSB0jKTGRTEsZ9RvmSaI9gZfaKNm5KsDc5MwlFBAAgAQAIAEACABAH/2Q==" alt="" />
</a>

          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} EasyTales. All rights reserved.</p>
        <div className="footer-legal">
          <Link to="/privacy">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
