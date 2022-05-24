import React, {useState, useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import {updateUserProfile} from '../../services/userService';
import { AuthContext } from '../authenticaion/ProvideAuth';
import { useHistory } from 'react-router';
import Snackbar from '@mui/material/Snackbar';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright ©️ '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const tiers = [
  {
    title: 'Free',
    price: '0',
    walletUpgrade: 0,
    description: [
      ' 100$ signup rewards',
      ' Valid for 3 months',
      ' Help center access',
      ' Email support',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    price: '10',
    walletUpgrade: 10,
    description: [
      ' 100$ Signup rewards',
      ' 100$ Addtional wallet rewards',
      ' Help center access',
      ' Priority email support',
    ],
    buttonText: 'CHOOSE',
    buttonVariant: 'outlined',
  },
  {
    title: 'Enterprise',
    price: '30',
    walletUpgrade: 30,
    description: [
      ' 100$ Signup rewards',
      ' 200$ Addtional wallet rewards',
      ' Help center access',
      ' Phone & email support',
      
    ],
    buttonText: 'CHOOSE',
    buttonVariant: 'outlined',
  },
];

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one',
    ],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

function PricingContent() {

  const authContext = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const {user, setUser, token, updateLocalStorage} = authContext;
  
  const handleClose = () => {
    setOpen(false);
  } 

  const walletUpgradeHandler = async (walletUpgrade) => {

    console.log("walletUpgrade : ", walletUpgrade);
    const obj = {
      ...user,
      walletBalance: user.walletBalance - walletUpgrade,
    }
    const response = await updateUserProfile(obj);
    console.log(response);
    if(response.status === 200){
      // window.alert("Wallet has been upgraded to $ " + walletUpgrade);
      setOpen(true);
      setUser(response.data.payload.data);
      updateLocalStorage(user, token);
      setTimeout(()=>{
        console.log("history.push('/Dashboard');");
        history.push('/Dashboard');
      }, 500);
    } 
    else{
      console.log('Error Occuered');
    }
  }



  return (
    <React.Fragment>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Payment Plan Updated"
      />
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
      </AppBar>
      {/* Hero unit */}
      
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
        
          Payment Plan
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Choose a payment plan to initiate your wallet.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              action={tier.title === 'Enterprise' ? <StarIcon /> : null}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  // subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[500]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="Blue">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="cadetblue">
                      /month
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} onClick={()=>walletUpgradeHandler(tier.walletUpgrade)}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}