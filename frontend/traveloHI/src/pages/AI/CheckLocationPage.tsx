import { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 90%;
  height: 100vh;
  max-height: 90%;
  text-align: center;
  margin: 20px;
`;

const PageTitle = styled.p`
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 5px;
`;

const FileInput = styled.input`
  margin: 20px;
`;

const StyledButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: #00a3e7;
  color: white;
  cursor: pointer;
`;

const PredictionList = styled.div`
  margin-top: 20px;
`;

const PredictionItem = styled.div`
  margin: 5px 0;
`;

export default function CheckLocationPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [predictions, setPredictions] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      console.log(formData);
      const res = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.prediction);
      setPredictions(res.data.prediction);
    } catch (error) {
      console.error("Error during API call", error);
      setPredictions("");
    }
  };

  return (
    <OuterContainer>
      <PageTitle>Check Location Page</PageTitle>
      <FileInput type="file" onChange={handleFileChange} />
      <StyledButton onClick={handleSubmit}>Submit</StyledButton>
      <PredictionList>
        <PredictionItem>{predictions}</PredictionItem>
      </PredictionList>
    </OuterContainer>
  );
}
