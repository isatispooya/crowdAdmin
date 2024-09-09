import { Button } from "@mui/material";
import useNavigateStep from "src/hooks/use-navigate-step";

const ContractPage = () => {
    const { page, incrementPage, decrementPage, changePage } = useNavigateStep();

    return (
        <div>
            <p>مقدار صفحه: {page}</p>
            <Button onClick={incrementPage}>افزایش</Button>
            <Button onClick={decrementPage}>کاهش</Button>
            <Button onClick={()=>changePage(3)}>چنج</Button>
        </div>
    );
};

export default ContractPage;


