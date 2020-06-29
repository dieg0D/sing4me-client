import React, { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Container, Img } from "./styles";
import { Avatars } from "../../utils/Avatars";
import { useAuth } from "../../contexts/AuthContext";
import { updateAvatar } from "../../services/User";
import CircularProgress from "@material-ui/core/CircularProgress";

interface List {
  setShowList: any;
}

const ListIcons: React.FC<List> = ({ setShowList }) => {
  const { user, updateData } = useAuth();
  const [avatar, setAvatar] = useState("");
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    setAvatar(user ? user?.avatar : "");
  }, [user]);

  const changeAvatar = (newAvatar: string) => {
    updateAvatar(newAvatar)
      .then((res) => updateData(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <div className="header">
        <FiArrowLeft size={25} onClick={() => setShowList(false)} />
        <h2>Escolha seu avatar</h2>
      </div>
      <div className="container">
        {Avatars.map((item, index) => (
          <Img
            active={avatar === item}
            display={loaded === 50}
            key={index}
            src={`https://drive.google.com/uc?export=view&id=${item}`}
            onLoad={() => setLoaded(loaded + 1)}
            onClick={() => changeAvatar(item)}
            alt="Avatar"
          />
        ))}
        {loaded !== 50 ? (
          <div className="loader">
            <CircularProgress style={{ color: "darkviolet" }} />
          </div>
        ) : undefined}
      </div>
    </Container>
  );
};

export default ListIcons;
