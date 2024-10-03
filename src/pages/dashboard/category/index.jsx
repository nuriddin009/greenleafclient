import React, {useEffect, useState} from 'react';
import {Box, Button, InputAdornment, TextField} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Avatar from "@mui/material/Avatar";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Pagination from "@mui/material/Pagination";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import instance from "../../../utils/instance.js";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {useForm} from "react-hook-form";
import Slide from "@mui/material/Slide";
import uploadImg from '../../../assets/upload.png'
import {toast} from "react-toastify";
import EmptyTableData from "../../../components/emptydata/EmptyTableData.jsx";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        background: '#4caf50',
        color: '#fff'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const StyledIconButton = styled(IconButton)({
    border: '1px solid #ccc',
    borderRadius: '50%',
    padding: '8px',
    margin: '4px',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Index(props) {

    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [categories, setCategories] = useState([])
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)
    const [category, setCategory] = useState(null)
    const [totalPages, setTotalPages] = useState(0)

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}, control
    } = useForm()

    const submitForm = (data) => {

        if (!category) {
            if (file) {
                let formData = new FormData()
                formData.append('file', file)
                formData.append('name', data?.name)
                formData.append('description', data?.description)

                instance.post('/v1/category', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    reset({
                        name: '',
                        description: ''
                    })
                    setImage(null)
                    setFile(null)
                    getCategories('', 0)
                    handleCloseModal()
                })

            } else {
                window.alert('Kategoriya uchun rasm tanlang')
            }
        } else {
            let formData = new FormData()
            if (file) {
                formData.append('file', file)
            }
            formData.append('name', data?.name)
            formData.append('description', data?.description)


            instance.put(`/v1/category/${category?.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res.data)
                getCategories('', 0)
                handleCloseModal()
                toast.success("Kategoriya  o'zgartirildi")
            })
        }

    }


    const handleCloseModal = () => {
        setOpen(false);
        reset({
            name: '',
            description: ''
        })
        setCategory(null)
        setImage(null)
        setFile(null)
    };
    const handleClickOpenModal = () => {
        setOpen(true);
    };

    useEffect(() => {
        getCategories('', 0)
    }, []);

    const getCategories = (search, page) => {
        instance.get('/v1/category', {
            params: {
                search,
                page
            }
        }).then(res => {
            console.log(res.data)
            setCategories(res.data.elements)
            setTotalPages(res.data?.requestPage?.pageLimit)
        })
    }

    const handleFile = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]))
        setFile(event.target.files[0])
    }
    const deleteCategory = (categoryId, name) => {
        if (window.confirm(`${name} kategoriyasini o'chirmoqchimisiz?`)) {
            instance.delete(`/v1/category`, {params: {categoryId}}).then(res => {
                getCategories('', 0)
                console.log(res.data)
                toast.success(`${name} kategoriyasi o'chirildi ✅`)
            })
        }
    }

    const updateCategory = (category) => {
        reset({
            name: category?.name,
            description: category?.description
        })
        setCategory(category)
        setImage(category?.image)
        handleClickOpenModal()
    }

    const handlePage = (event, page) => {
        setPage(page)
        getCategories(search, page - 1)
    }
    const handleSearch = (e) => {
        setSearch(e.target.value)
        getCategories(e.target.value, 0)
    }

    return (
        <div className={'category'}>
            <Button
                variant='text'
                size='large'
                color='success'
                startIcon={<DashboardIcon/>}
            >Kategoriyalar</Button>


                <Box sx={{margin: '20px 0', display: 'flex', gap: '1rem', justifyContent: 'space-between'}}>

                    <TextField
                        label={'Qidirish...'}
                        color='success'
                        value={search}
                        onChange={handleSearch}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon color='success'/>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        size='large'
                        variant='outlined'
                        color='success'
                        onClick={handleClickOpenModal}
                    ><AddCircleOutlineIcon/></Button>

                </Box>

            {
                categories.length === 0 ? <EmptyTableData
                        message="Kategoriyalar mavjud emas"
                        onActionClick={handleClickOpenModal}
                        actionLabel="Yangi qo'shish"
                    />
                    : <div><TableContainer component={Paper}>
                        <Table sx={{minWidth: 700}} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell sx={{background: '#4caf50', color: '#fff'}}>Rasm</StyledTableCell>
                                    <StyledTableCell>Nomi</StyledTableCell>
                                    <StyledTableCell align="left">{"Qo'shimcha"}</StyledTableCell>
                                    <StyledTableCell align="right">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categories.map((category, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell component="th" scope="row">
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={category?.image}
                                                sx={{width: 56, height: 56}}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{category?.name}</StyledTableCell>
                                        <StyledTableCell align="left">{category?.description}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <StyledIconButton>
                                                <CreateIcon
                                                    onClick={() => updateCategory(category)}
                                                    color={'primary'}/>
                                            </StyledIconButton>

                                            <StyledIconButton>
                                                <DeleteOutlineIcon
                                                    onClick={() => deleteCategory(category?.id, category?.name)}
                                                    color={'error'}/>
                                            </StyledIconButton>

                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                        <Pagination
                            count={totalPages}
                            onChange={handlePage}
                            page={page}
                            variant="outlined"
                            color="success"
                            size='large'
                            sx={{
                                float: 'right',
                                marginTop: '20px',
                            }}
                        />
                    </div>
            }


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
                            {category ? "Kategoriyani tahrirlash" : "Kategoriya qo'shish"}
                        </Typography>
                        <Button
                            color="inherit"
                            type='submit'
                            form='ctg_form'>
                            Saqlash
                        </Button>
                    </Toolbar>
                </AppBar>


                <form id='ctg_form' onSubmit={handleSubmit(submitForm)} style={{margin: '0 auto'}}>
                    <Box sx={{
                        width: '100vw',
                        height: '100%',
                        padding: '1rem',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: '1.5rem'
                    }}>
                        <label style={{margin: '0 auto'}}>
                            <input
                                type="file"
                                accept='image/*'
                                style={{display: 'none'}}
                                onChange={handleFile}
                            />
                            {image ? <img src={image} width={150} height={150} alt="img"/> :
                                <img src={uploadImg} width={150} height={150} alt="asd"/>
                            }
                        </label>

                        <TextField
                            label='Nomi'
                            fullWidth
                            color={errors?.name ? 'error' : 'primary'}
                            {...register('name', {required: 'Kategoriya nomini kiriting'})}
                            error={!!errors.name}
                            helperText={errors.name ? errors.name.message : ''}
                        />

                        <TextField
                            label="Qo'shimcha"
                            multiline
                            rows={6}
                            fullWidth
                            color={errors?.description ? 'error' : 'primary'}
                            {...register('description', {required: "Qo'shimcha malumot kiriting"})}
                            error={!!errors.description}
                            helperText={errors.description ? errors.description.message : ''}
                        />
                    </Box>
                </form>
            </Dialog>


        </div>
    )
        ;
}

export default Index;