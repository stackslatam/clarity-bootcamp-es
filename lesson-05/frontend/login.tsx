import { FC, useContext, useState, useEffect } from "react";
import { AppConfig, UserSession, showConnect, } from "@stacks/connect";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import style from "./Header.module.scss";
import Button from "@/shared/components/Button/Button";
import { GlobalContext } from "@/shared/store/GlobalProvider";
import {
  GlobalProviderState,
  stepperRelation,
} from "@/domain/global-provider-state";
import Logo from "@/assets/Logo.svg";
import { login } from "@/shared/services/opportunity.service";
import { logout } from "@/shared/services/opportunity.service";

const UserIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.6488 17.8746C18.2209 15.4062 16.0206 13.6362 13.4528 12.7971C14.723 12.041 15.7098 10.8888 16.2618 9.51755C16.8137 8.14629 16.9003 6.63175 16.5082 5.20652C16.1161 3.78129 15.267 2.52418 14.0912 1.62824C12.9155 0.732298 11.4782 0.24707 10 0.24707C8.52182 0.24707 7.08451 0.732298 5.90878 1.62824C4.73306 2.52418 3.88394 3.78129 3.49183 5.20652C3.09971 6.63175 3.18629 8.14629 3.73825 9.51755C4.29021 10.8888 5.27704 12.041 6.5472 12.7971C3.97938 13.6352 1.77907 15.4052 0.35126 17.8746C0.298899 17.96 0.264169 18.055 0.249118 18.154C0.234067 18.253 0.239 18.3541 0.263626 18.4511C0.288252 18.5482 0.332073 18.6394 0.392502 18.7192C0.452931 18.7991 0.528745 18.8661 0.61547 18.9162C0.702196 18.9663 0.798076 18.9985 0.897455 19.0109C0.996833 19.0234 1.0977 19.0158 1.19409 18.9886C1.29049 18.9614 1.38047 18.9152 1.45872 18.8527C1.53697 18.7902 1.6019 18.7126 1.6497 18.6246C3.41595 15.5721 6.53782 13.7496 10 13.7496C13.4622 13.7496 16.5841 15.5721 18.3503 18.6246C18.3981 18.7126 18.4631 18.7902 18.5413 18.8527C18.6196 18.9152 18.7095 18.9614 18.8059 18.9886C18.9023 19.0158 19.0032 19.0234 19.1026 19.0109C19.2019 18.9985 19.2978 18.9663 19.3845 18.9162C19.4713 18.8661 19.5471 18.7991 19.6075 18.7192C19.6679 18.6394 19.7118 18.5482 19.7364 18.4511C19.761 18.3541 19.766 18.253 19.7509 18.154C19.7358 18.055 19.7011 17.96 19.6488 17.8746ZM4.75001 6.99962C4.75001 5.96127 5.05792 4.94624 5.63479 4.08288C6.21167 3.21952 7.03161 2.54661 7.99092 2.14925C8.95023 1.75189 10.0058 1.64793 11.0242 1.8505C12.0426 2.05307 12.9781 2.55308 13.7123 3.28731C14.4465 4.02154 14.9466 4.957 15.1491 5.9754C15.3517 6.9938 15.2477 8.0494 14.8504 9.00871C14.453 9.96802 13.7801 10.788 12.9168 11.3648C12.0534 11.9417 11.0384 12.2496 10 12.2496C8.60808 12.2481 7.27359 11.6945 6.28934 10.7103C5.3051 9.72604 4.7515 8.39155 4.75001 6.99962Z"
      fill="white"
    />
  </svg>
);

const UserIconWallet = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.6488 17.8746C18.2209 15.4062 16.0206 13.6362 13.4528 12.7971C14.723 12.041 15.7098 10.8888 16.2618 9.51755C16.8137 8.14629 16.9003 6.63175 16.5082 5.20652C16.1161 3.78129 15.267 2.52418 14.0912 1.62824C12.9155 0.732298 11.4782 0.24707 10 0.24707C8.52182 0.24707 7.08451 0.732298 5.90878 1.62824C4.73306 2.52418 3.88394 3.78129 3.49183 5.20652C3.09971 6.63175 3.18629 8.14629 3.73825 9.51755C4.29021 10.8888 5.27704 12.041 6.5472 12.7971C3.97938 13.6352 1.77907 15.4052 0.35126 17.8746C0.298899 17.96 0.264169 18.055 0.249118 18.154C0.234067 18.253 0.239 18.3541 0.263626 18.4511C0.288252 18.5482 0.332073 18.6394 0.392502 18.7192C0.452931 18.7991 0.528745 18.8661 0.61547 18.9162C0.702196 18.9663 0.798076 18.9985 0.897455 19.0109C0.996833 19.0234 1.0977 19.0158 1.19409 18.9886C1.29049 18.9614 1.38047 18.9152 1.45872 18.8527C1.53697 18.7902 1.6019 18.7126 1.6497 18.6246C3.41595 15.5721 6.53782 13.7496 10 13.7496C13.4622 13.7496 16.5841 15.5721 18.3503 18.6246C18.3981 18.7126 18.4631 18.7902 18.5413 18.8527C18.6196 18.9152 18.7095 18.9614 18.8059 18.9886C18.9023 19.0158 19.0032 19.0234 19.1026 19.0109C19.2019 18.9985 19.2978 18.9663 19.3845 18.9162C19.4713 18.8661 19.5471 18.7991 19.6075 18.7192C19.6679 18.6394 19.7118 18.5482 19.7364 18.4511C19.761 18.3541 19.766 18.253 19.7509 18.154C19.7358 18.055 19.7011 17.96 19.6488 17.8746ZM4.75001 6.99962C4.75001 5.96127 5.05792 4.94624 5.63479 4.08288C6.21167 3.21952 7.03161 2.54661 7.99092 2.14925C8.95023 1.75189 10.0058 1.64793 11.0242 1.8505C12.0426 2.05307 12.9781 2.55308 13.7123 3.28731C14.4465 4.02154 14.9466 4.957 15.1491 5.9754C15.3517 6.9938 15.2477 8.0494 14.8504 9.00871C14.453 9.96802 13.7801 10.788 12.9168 11.3648C12.0534 11.9417 11.0384 12.2496 10 12.2496C8.60808 12.2481 7.27359 11.6945 6.28934 10.7103C5.3051 9.72604 4.7515 8.39155 4.75001 6.99962Z"
      fill="black"
    />
  </svg>
);

const Header: FC = () => {

  const icon = "@assets/ShortLogo.svg";

  const appConfig = new AppConfig(["store_write"]);
  const userSession = new UserSession({ appConfig });

  const appDetails = {
    name: "Keros",
    icon: icon,
  };

  const navigate = useNavigate();
  const { stepper } = useContext(GlobalContext) as GlobalProviderState;

  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const { testnet } = userSession.loadUserData().profile.stxAddress;
      const userWallet = testnet;
      console.log("=> user Wallet: ", userWallet);
      setWalletAddress(userWallet);
      login(userWallet).then(({ success, message }) => {
        if (!success) {
          // Aquí puedes manejar el mensaje de error, por ejemplo, mostrándolo en la UI
          console.log("=>Error desde useEffect", message);
          // Utiliza window.confirm en lugar de alert
          if (window.confirm(message)) {
            // Si el usuario hace clic en "OK", desconecta la wallet
            disconnectWallet();
          }
        } else {
          console.log("=> login correcto");
        }
      });
    }
  }, [userSession.isUserSignedIn()]);

  const connectWallet = () => {
    showConnect({
      appDetails,
      onFinish: () => {
        window.location.reload()
        userSession.handlePendingSignIn()
      },
      userSession,
    });
  };

  const disconnectWallet = () => {
    if (userSession.isUserSignedIn()) {
      userSession.signUserOut(window.location.href);
      console.log("Wallet desconectada");
      logout();
    } else {
      console.log("No hay wallet conectada");
    }
  };

  return (
    <div className={style.container}>
      <div
        className={classNames(`${style.container__wrapper} max-container`, {
          [style.container__wrapper__stepper]: stepper,
        })}
      >
        {stepper ? (
          <>
            <img src={Logo} />
            <div className={style.stepper__wrapper}>
              {stepperRelation.get(stepper.type)?.map(({ name, step }) => (
                <div key={step}
                  className={classNames(style.stepper__wrapper__item, {
                    [style.stepper__wrapper__item__active]:
                      stepper.step === step,
                  })}
                >
                  {name}
                </div>
              ))}
            </div>
            <button className={style.close_button} onClick={() => navigate(-1)}>
              X
            </button>
          </>
        ) : (
          <div className={style.login_buttons}>
            {walletAddress ? (
              <>
                <span className={style.user_wallet}>
                  <span>{UserIconWallet}</span>
                  <span>{walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}</span>
                </span>
                <Button
                  label="Disconnect Wallet"
                  onClick={() => { disconnectWallet() }}
                ></Button>
              </>) : (
              <Button
                label="Connect Wallet"
                onClick={() => { connectWallet() }}
                Icon={UserIcon}
              ></Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;