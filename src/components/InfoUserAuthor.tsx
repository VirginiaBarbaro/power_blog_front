// import { useLocation } from "react-router-dom";
import { AuthorInfo } from "../types/user";

function InfoUserAuthor({ authorInfo }: AuthorInfo) {
  return (
    <div>
      <div>
        {authorInfo.firstname}
        <p>Este es el perfil de el author del articulo que NO ES LOGUEADO</p>
      </div>
    </div>
  );
}

export default InfoUserAuthor;
