import { useRef, useState } from "react";
import {  useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Divider,
 
  lighten,

  Popover,
  Typography
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { removeTokensAndUser } from "../../../../Store/slice/Account";
import { useAppDispatch, useAppSelector } from "../../../../Store/StoreConfig";




const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {



  const loginToken = useAppSelector((state) => state.auth?.account?.accessToken)

const payloadBase64 = loginToken?.split(".")?.[1]||""; 
const user = JSON.parse(atob(payloadBase64));


const nav=useNavigate()
  const [isOpen, setOpen] = useState(false);

  const ref = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


const dispatch=useAppDispatch()

const Logout=()=>{
  dispatch(removeTokensAndUser())
nav("/")
}


  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar
          variant="rounded"
          alt={user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]}
          src={""}
        />
       
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar
            variant="rounded"
            alt={user.name}
            src={""}
            // onClick={handleAvatarModalOpen}
          />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]}</UserBoxLabel>
            <UserBoxDescription variant="body2">
            {Array.isArray(user?.roles) ? user.roles[user.roles.length - 1] : user?.roles}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
       
      
        <Box sx={{ m: 1 }}>
          <Button  onClick={Logout}
             color="error" fullWidth >
            Logout
          </Button>
        </Box>
      </Popover>

   
    </>
  );
}

export default HeaderUserbox;
