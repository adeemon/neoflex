import * as React from 'react';
// import { Dispatch } from 'react';
// import { AnyAction } from 'redux';
import { useSelector } from 'react-redux';
import { postCustom } from '../../api';
import { selectIsSubscribed, subscribeUser } from '../../redux/slices/userStorageSlice';
import { useAppDispatch } from '../../redux/store/store';


export const NewsSub: React.FC = () => {
  const isSubscribed = useSelector(selectIsSubscribed);
  const dispatch = useAppDispatch();
  const postPath = 'http://localhost:8080/email';

  const onClick = (email: string) => {
    dispatch(subscribeUser());
    postCustom(postPath, { email });
  };


  return (
    <>
      { isSubscribed ? <div className="news-sub__title">You are already subscribed to the bank's newsletter</div>
        : (
          <section className="news-sub">
            <div className="news-sub__title-block">
              <h2 className="news-sub__title">Subscribe Newsletter & get</h2>
            </div>
            <p className="news-sub__sub-content">Bank News</p>
            <form
              action=""
              className="news-sub__form"
              onSubmit={ (e: React.SyntheticEvent) => {
                e.preventDefault();
                const target = e.target as typeof e.target & {
                  userEmail: { value: string };
                };
                const email = target.userEmail.value;
                onClick(email);
              } }
            >
              <input type="email" className="news-sub__email-input" name="userEmail" id="newsletterEmail" placeholder="Your email" />
              <button className="news-sub__submit-button sub-button" type="submit">
                <svg
                  className="sub-button__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="41"
                  viewBox="0 0 31 41"
                  fill="none"
                >
                  <g clipPath="url(#clip0_93_3979)">
                    <path d="M19.4114 9.82539L3.18914 19.2758C2.5057 19.6739 2.10525 20.5644 2.14396 21.5994C2.18274 22.6345 2.6529 23.6057 3.37098 24.1338L9.04222 28.3048L13.6627 21.2824C13.8753 20.9593 14.2679 20.9583 14.5396 21.2804C14.8112 21.6024 14.859 22.1255 14.6464 22.4487L10.0259 29.4711L13.8097 36.5105C14.2888 37.4019 15.0648 37.9083 15.8347 37.832C16.6062 37.7556 17.2138 37.1106 17.4234 36.1527L22.4058 13.3757C22.6327 12.3387 22.3588 11.2027 21.6912 10.4111C21.0236 9.61955 20.15 9.39503 19.4114 9.82539Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_93_3979">
                      <rect width="23.9072" height="26.0371" fill="white" transform="matrix(0.54966 -0.835388 0.64472 0.764419 0.156799 20.4309)" />
                    </clipPath>
                  </defs>
                </svg>
                <p className="sub-button__content">Subscribe</p>
              </button>
            </form>
          </section>
        ) }
    </>
  );
};
