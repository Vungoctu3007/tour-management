import Header from "../Header";
import CategoryTitle from "../../components/CategoryTitle";
import ProfileItem from "../../components/ProfileItem";
function ProfileLayout({ children }) {
  return (
    <>
      <Header />
      <div className="container">
        <div style={{ margin: "20px 0px" }}>
          <CategoryTitle title="Hồ sơ"/>
        </div>
        <div className="row">
          <div className="col-3">
            <ProfileItem isClass={true}/>
          </div>
          <div className="col-9 border rounded">{children}</div>
        </div>
      </div>
    </>
  );
}

export default ProfileLayout;
