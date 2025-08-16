import { Card, CardContent, Typography } from "@mui/material";

const TotalCards = () => {
  return (
    <div className='md:flex pt-12 w-full'>
       <Card sx={{ m:2, p: 2,flex: 1,borderRadius:4}}>
        <CardContent sx={{}}>
            <Typography sx={{fontSize:15}}>Total Balance</Typography>
            <Typography variant="h4" sx={{fontSize:15}}>
            ₹58
            </Typography>
        </CardContent>
        </Card>

       <Card sx={{ m: 2, p: 2,flex: 1,borderRadius:4}}>
        <CardContent>
            <Typography sx={{fontSize:15}}>Total Income</Typography>
            <Typography sx={{fontSize:15}} color="green">₹500</Typography>
        </CardContent>
        </Card>

        <Card sx={{ m: 2, p: 2,flex: 1,borderRadius:4}}>
        <CardContent>
            <Typography sx={{fontSize:15}}>Total Expense</Typography>
            <Typography sx={{fontSize:15}} color="red">₹800</Typography>
        </CardContent>
        </Card>

    </div>
  )
}

export default TotalCards