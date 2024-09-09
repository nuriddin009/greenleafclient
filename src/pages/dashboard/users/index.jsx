import React, {useEffect, useState} from 'react';
import {Button, InputAdornment, TextField} from "@mui/material";
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import IconButton from "@mui/material/IconButton";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import PhoneInput from 'react-phone-input-2'
import instance from "../../../utils/instance.js";
import {Controller, useForm} from "react-hook-form";
import PasswordInput from "../../../components/passwordInput/index.jsx";
import {toast} from "react-toastify";
import EmptyTableData from "../../../components/emptydata/EmptyTableData.jsx";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        background: '#4caf50', color: '#fff'
    }, [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    }, // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const StyledIconButton = styled(IconButton)({
    border: '1px solid #ccc', borderRadius: '50%', padding: '8px', margin: '4px', '&:hover': {
        backgroundColor: '#f0f0f0',
    },
});


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function Index(props) {

    const [statusFilter, setStatusFilter] = useState('ALL')
    const [search, setSearch] = useState('')
    const [open, setOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        getUsers()
    }, []);


    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}, control
    } = useForm()

    const getUsers = (status, search, page) => {
        instance.get('/v1/user', {
            params: {
                status, search,
                page
            }
        }).then(res => {
            console.log(res.data)
            setUsers(res.data.elements)
            setTotalPages(res.data?.requestPage?.pageLimit)
        })
    }


    const handleClickOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setCurrentUser(null)
    };
    const handleStatusFilter = (e) => {
        setStatusFilter(e.target.value)
        getUsers(e.target.value, search)
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
        getUsers(statusFilter, e.target.value)
    }

    const changeStatus = (user, status) => {
        if (window.confirm(`${user?.firstname} ${user?.lastname} ni statusini ${status}ga o'zgartirmoqchimisiz? `)) {
            instance.patch(`/v1/user?userId=${user?.id}&status=${status}`).then(res => {
                if (res.status) {
                    getUsers(statusFilter, search)
                }
            })
        }
    }

    const dataFormat = (dateStr) => {
        const dateObj = new Date(dateStr);

        const formatter = new Intl.DateTimeFormat('en-US', {
            year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
        });

        return formatter.format(dateObj);
    }

    const submitForm = (data) => {
        console.log(data)

        data = {
            ...data,
            phoneNumber: !data?.phoneNumber.startsWith('+') ? ('+' + data?.phoneNumber) : data?.phoneNumber
        }
        if (currentUser) {
            instance.put(`/v1/user/${currentUser?.id}`, data).then(res => {
                reset({
                    firstname: '',
                    lastname: '',
                    phoneNumber: '998',
                    password: ''
                })
                handleCloseModal()
                toast.success("Mijoz tahrirlandi ✅")
                getUsers('ALL', '', 0)
            }).catch(e => {
                toast.error(e)
            })
        } else {
            instance.post('/v1/user', data).then(res => {
                reset({
                    firstname: '',
                    lastname: '',
                    phoneNumber: '998',
                    password: ''
                })
                handleCloseModal()
                getUsers('ALL', '', 0)
                toast.success("Yangi foydalanuvchi qo'shildi ✅")
            }).catch(e => {
                toast.error(e)
            })
        }


    }

    const updateUser = (user) => {
        reset({
            firstname: user?.firstname,
            lastname: user?.lastname,
            phoneNumber: user?.phoneNumber,
            email: user?.email
        })
        setCurrentUser(user)
        handleClickOpenModal()

    }

    const handlePage = (e, page) => {
        setPage(page)
        getUsers(statusFilter, search, page - 1)
    }


    return (<div className={'users'}>

        <Button
            variant='text'
            size='large'
            color='success'
            startIcon={<AccountCircleIcon/>}
        >Mijozlar</Button>


        {users.length > 0 && <Box sx={{
            margin: '20px 0',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
        }}>
            <TextField
                label={'Qidirish...'}
                color='success'
                value={search}
                onChange={handleSearch}
                InputProps={{
                    endAdornment: (<InputAdornment position="end">
                        <PersonSearchIcon color='success'/>
                    </InputAdornment>),
                }}
            />

            <Box sx={{minWidth: 140}}>
                <FormControl fullWidth>
                    <InputLabel color={'success'}>Status</InputLabel>
                    <Select
                        value={statusFilter}
                        label="Status"
                        color={'success'}
                        onChange={handleStatusFilter}
                    >
                        <MenuItem value={'ALL'}>
                            <Button startIcon={<PeopleOutlineIcon/>}>
                                Hammasi
                            </Button>
                        </MenuItem>
                        <MenuItem value={'ACTIVE'}>
                            <Button color={'success'} startIcon={<TaskAltIcon color={'success'}/>}>Active</Button>
                        </MenuItem>
                        <MenuItem value={'BLOCK'}>
                            <Button color={'error'} startIcon={<NotInterestedIcon color={'error'}/>}>Block</Button>
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Button
                size='large'
                variant='outlined'
                color='success'
                onClick={handleClickOpenModal}
                startIcon={<PersonAddIcon/>}>{"Mijoz qo'shish"}</Button>
        </Box>}

        {
            users.length === 0 ? <EmptyTableData
                message="Mijozlar mavjud emas"
                onActionClick={handleClickOpenModal}
                actionLabel="Yangi qo'shish"
            /> : <div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell sx={{background: '#4caf50', color: '#fff'}}>ID</StyledTableCell>
                                <StyledTableCell align="right">MIjoz ismi</StyledTableCell>
                                <StyledTableCell align="right">Telefon raqam</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                                <StyledTableCell align="right">Sana</StyledTableCell>
                                <StyledTableCell align="right">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users?.map((user, index) => (<StyledTableRow key={user?.id}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell align="right">{user?.firstname} {user?.lastname}</StyledTableCell>
                                <StyledTableCell align="right">{user?.phoneNumber}</StyledTableCell>

                                <StyledTableCell align="right">
                                    {user?.status === 'ACTIVE' ?
                                        <Button color={'success'} variant={'outlined'}>Active</Button> :
                                        user?.status === 'BLOCK' ?
                                            <Button color={'error'} variant={'outlined'}>Block</Button> : <Button
                                                color={'warning'} variant={'outlined'}
                                            >{"So'rov"}</Button>}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {dataFormat(user?.createdAt)}
                                </StyledTableCell>
                                <StyledTableCell align="right">

                                    <StyledIconButton>
                                        {user?.status !== 'ACTIVE' ? <TaskAltIcon
                                                onClick={() => changeStatus(user, 'ACTIVE')}
                                                color={'success'}/> :
                                            <NotInterestedIcon
                                                onClick={() => changeStatus(user, 'BLOCK')}
                                                color={'error'}/>}
                                    </StyledIconButton>

                                    <StyledIconButton onClick={() => updateUser(user)}>
                                        <CreateIcon color={'primary'}/>
                                    </StyledIconButton>

                                    <StyledIconButton>
                                        <DeleteOutlineIcon color='error'/>
                                    </StyledIconButton>

                                </StyledTableCell>
                            </StyledTableRow>))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePage}
                    variant="outlined"
                    color="success"
                    size='large'
                    sx={{
                        float: 'right', marginTop: '20px',
                    }}
                />
            </div>
        }


        {/*Modal*/}


        <Dialog
            fullScreen
            open={open}
            onClose={handleCloseModal}
            TransitionComponent={Transition}
        >
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleCloseModal}
                        aria-label="close"
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        {currentUser ? 'Mijozni tahrirlash' : "Mijoz qo'shish"}
                    </Typography>
                    <Button autoFocus color="inherit" type='submit' form='submit_user'>
                        Saqlash
                    </Button>
                </Toolbar>
            </AppBar>


            <form id='submit_user' onSubmit={handleSubmit(submitForm)}>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>

                    <TextField
                        variant='outlined'
                        label='Ismi'
                        fullWidth
                        {...register('firstname')}
                    />
                    <TextField
                        variant='outlined'
                        label='Familiyasi'
                        fullWidth
                        {...register('lastname')}
                    />
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <PhoneInput
                                country={"uz"}
                                specialLabel={'Telefon raqam'}
                                value={value}
                                inputStyle={{width: '100%', borderColor: '#4caf50'}}
                                onChange={onChange}
                                prefix={"+"}
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <PasswordInput
                                label="Parol"
                                color='primary'
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />


                </Box>
            </form>

        </Dialog>

    </div>);
}

export default Index;