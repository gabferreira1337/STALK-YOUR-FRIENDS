import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import SOSBUser from "../components/SOSBUser";
import ModalFollowers from "./ModalFollowers";
import ModalAlertTime from "./ModalAlertTime";
import { getfollowing } from "../services/api";
import "../styles/Profile.css";
import { Button } from "react-bootstrap";

export default function Profile({
  username,
  sosmode,
  countlocations,
  countfriends,
}) {
  const [showmodal, setShowmodal] = useState(false);
  const [showAlertModal, setShowAlertModel] = useState(false);
  const [countfollowers, setCountFollowers] = useState(0);

  // get followers and store it in following
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getfollowing();
        setCountFollowers(response.data.length);
      } catch (error) {
        console.error("Couldn't get followers");
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const HandleFollower = (e) => {
    e.preventDefault();

    setShowmodal(true);
  };

  return (
    <>
      <div className="vh-50" style={{ backgroundColor: "" }}>
        <MDBContainer className="container py-5 ">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="12" xl="4">
              <MDBCard style={{ borderRadius: "15px" }}>
                <MDBCardBody className="text-center">
                  <div className="mt-3 mb-4">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                      className="rounded-circle"
                      fluid
                      style={{ width: "75px" }}
                    />
                  </div>

                  <MDBCardText className="text-muted mb-4">
                    {username} <span className="mx-2">|</span>{" "}
                    <SOSBUser sosmode={sosmode} />{" "}
                    <Button
                      className="btn btn-sm"
                      onClick={() => setShowAlertModel(true)}
                    >
                      {" "}
                      AlertTime{" "}
                    </Button>
                  </MDBCardText>

                  <div className="d-flex justify-content-between text-center mt-5 mb-2">
                    <div>
                      <MDBCardText className="mb-1 h5">
                        {countfriends}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Friends
                      </MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">
                        {countlocations}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Localizations Registered
                      </MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">
                        {countfollowers}
                      </MDBCardText>
                      <MDBCardText
                        className="small text-muted mb-0"
                        onClick={HandleFollower}
                      >
                        Followers
                      </MDBCardText>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <ModalFollowers showmodal={showmodal} setShowmodal={setShowmodal} />
      <ModalAlertTime
        setShowAlertModel={setShowAlertModel}
        showAlertModal={showAlertModal}
      />
    </>
  );
}
