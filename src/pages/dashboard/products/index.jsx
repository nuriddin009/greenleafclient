import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, InputAdornment, TextField} from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Pagination from "@mui/material/Pagination";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import Avatar from '@mui/material/Avatar';
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import uploadImg from "../../../assets/upload.png";
import {Controller, useForm} from "react-hook-form";
import Slide from "@mui/material/Slide";
import Autocomplete from "@mui/material/Autocomplete";
import PriceInput from "../../../components/PriceFormat/index.jsx";
import instance from "../../../utils/instance.js";
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import EmptyTableData from "../../../components/emptydata/EmptyTableData.jsx";

const quillModules = {
    toolbar: [
        [{'header': '1'}, {'header': '2'}, {'header': '3'}, {'header': '4'}, {'font': []}],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['bold', 'italic', 'underline'],
        [{'color': []}, {'background': []}],
        [{'align': []}],
        ['link'],
        ['clean']
    ],
};

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

function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}


function Index(props) {
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [product, setProduct] = useState(null)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');


    const {
        register, handleSubmit, reset, formState: {errors}, control, watch, setValue, getValues
    } = useForm({
        defaultValues: {
            price: '',
            description: ''
        },
    })


    useEffect(() => {
        getProducts(0, '')
    }, []);

    const getProducts = (page, search) => {
        instance.get('/v1/product', {
            params: {page, search}
        }).then(res => {
            setProducts(res.data.elements)
            setTotalPages(res.data.requestPage.pageLimit)
        })
    }

    const getCategories = async (search) => {
        setLoading(true);
        try {
            const res = await instance.get('/v1/category/select', {
                params: {search}
            });
            setCategories(res.data.data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const submitForm = async (data) => {
        console.log('Loading...')

        let objData = {
            name: data?.name,
            categoryId: data?.category?.id,
            price: data?.price,
            description: data?.description,
            fileIds: files?.map((file) => file?.id)
        }


        if (objData.fileIds.length > 0) {
            if (product) {
                objData = {...objData, id: product?.id}
                instance.put('/v1/product', objData).then(res => {
                    reset({
                        name: '', description: '', price: 0, category: null
                    })
                    setFiles([])
                    getProducts(0, '')
                    handleCloseModal()
                })
            } else {
                await instance.post('/v1/product', objData).then(res => {
                    reset({
                        name: '', description: '', price: 0, category: null
                    })
                    setFiles([])
                    getProducts(0, '')
                    handleCloseModal()
                }).catch(e => {
                    console.error('Error creating product:', e);
                })
            }
        } else alert('Iltimos mahsulot uchun rasm tanlang')


    }


    const handleFile = async (e) => {
        const selectedFiles = Array.from(e.target.files);

        if (selectedFiles.length + files.length > 10) {
            alert("Siz ko'pi bilan 10 tagacha rasm yuklashingiz mumkin");
            return;
        }

        if (selectedFiles.length > 0) {
            const formData = new FormData();

            Array.from(e.target.files).forEach((file) => {
                formData.append('files', file);
            });

            await instance.post('/v1/file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                setFiles(prevFiles => [...prevFiles, ...res.data])
            })
        } else alert("Iltimos product uchun rasm tanlang")

    };

    const removeImage = async (indexToRemove, id, productId) => {
        await instance.delete('/v1/file', {params: {id, productId}}).then(res => {
            setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
            console.log(res.data)
        })
    };

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('imageIndex', index);
    };

    const handleDrop = (e, dropIndex) => {
        const dragIndex = e.dataTransfer.getData('imageIndex');
        if (dragIndex === dropIndex) return;

        const updatedFiles = [...files];
        const [draggedItem] = updatedFiles.splice(dragIndex, 1);
        updatedFiles.splice(dropIndex, 0, draggedItem);
        setFiles(updatedFiles);
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Prevent the default behavior to allow dropping
    };

    const handleCloseModal = () => {
        reset({
            name: '', description: '', price: 0, category: null
        })
        setFiles([])
        setProduct(null)
        setOpen(false);
    };
    const handleClickOpenModal = () => {
        setOpen(true);
    };

    const updateProduct = (product) => {
        handleClickOpenModal()
        setProduct(product)
        reset({
            name: product?.name, description: product?.description, category: {
                id: product?.category?.id, name: product?.category?.name
            }, price: product?.price
        })
        setFiles(product?.images?.map(image => ({id: image?.id, url: image?.url})))
    }


    const formatNumber = (value) => {
        const number = value.replace(/\D/g, ''); // Remove all non-digit characters
        return new Intl.NumberFormat().format(number);
    };

    const handleChange = (event) => {
        const rawValue = event.target.value;
        const formattedValue = formatNumber(rawValue);
        setValue(formattedValue);
    };

    const onPageChange = (page) => {
        setPage(page)
        getProducts(page - 1, search)
    }
    const handleSearch = (e) => {
        setSearch(e.target.value)
        getProducts(0, e.target.value)
    }

    return (<div className={'products'}>
        <Button
            variant='text'
            size='large'
            color='success'
            startIcon={<ViewListIcon/>}
        >Mahsulotlar</Button>


            <Box sx={{margin: '20px 0', display: 'flex', gap: '1rem', justifyContent: 'space-between'}}>

                <TextField
                    label={'Qidirish...'}
                    color='success'
                    value={search}
                    onChange={handleSearch}
                    InputProps={{
                        endAdornment: (<InputAdornment position="end">
                            <SearchIcon color='success'/>
                        </InputAdornment>),
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
            products.length === 0 ? <EmptyTableData
                message="Mahsulotlar mavjud emas"
                onActionClick={handleClickOpenModal}
                actionLabel="Yangi qo'shish"
            /> : <div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell sx={{background: '#4caf50', color: '#fff'}}>Rasmi</StyledTableCell>
                                <StyledTableCell>Mahsulot</StyledTableCell>
                                <StyledTableCell align="left">Kategoriya</StyledTableCell>
                                <StyledTableCell align="left">Narxi</StyledTableCell>
                                <StyledTableCell align="left">{"Qo'shimcha"}</StyledTableCell>
                                <StyledTableCell align="right">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product, index) => (<StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={product?.images[0]?.url}
                                        sx={{width: 56, height: 56}}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="left">{product?.name}</StyledTableCell>
                                <StyledTableCell align="left">{product?.category?.name}</StyledTableCell>
                                <StyledTableCell align="left">{product?.price?.toLocaleString()} UZS</StyledTableCell>
                                <StyledTableCell align="left">{parse(product?.description)}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <StyledIconButton>
                                        <CreateIcon onClick={() => updateProduct(product)} color={'primary'}/>
                                    </StyledIconButton>

                                    <StyledIconButton>
                                        <DeleteOutlineIcon color={'error'}/>
                                    </StyledIconButton>

                                </StyledTableCell>
                            </StyledTableRow>))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, page) => onPageChange(page)}
                    variant="outlined"
                    color="success"
                    size='large'
                    sx={{
                        float: 'right', marginTop: '20px',
                    }}
                />
            </div>
        }


        <Dialog
            fullScreen
            open={open}
            onClose={handleCloseModal}
            TransitionComponent={Transition}
            sx={{overflowX: 'hidden'}}
        >
            <AppBar sx={{position: 'relative', overflow: 'hidden'}}>
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
                        {product ? "Mahsulotni tahrirlash" : "Mahsulot qo'shish"}
                    </Typography>
                    <Button
                        color="inherit"
                        type='submit'
                        form='pr_form'>
                        Saqlash
                    </Button>
                </Toolbar>
            </AppBar>

            <div style={{textAlign: 'center'}}>
                <label style={{margin: '0 auto', cursor: 'pointer'}}>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        style={{display: 'none'}}
                        onChange={handleFile}
                    />
                    <img src={uploadImg} width={150}
                         height={150} alt="Upload"/>
                </label>

                <div style={{
                    marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
                    overflow: 'hidden'
                }}>
                    {files.map((fileObj, index) => (<div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        style={{position: 'relative', margin: '10px', cursor: 'move'}}
                    >
                        <img
                            src={fileObj.url}
                            width={100}
                            height={100}
                            alt={`img-${index}`}
                            style={{display: 'block'}}
                        />
                        <button
                            onClick={() => removeImage(index, fileObj?.id, product?.id)}
                            style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                background: 'red',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer'
                            }}
                        >
                            &times;
                        </button>
                    </div>))}
                </div>
            </div>

            <form id='pr_form' onSubmit={handleSubmit(submitForm)} style={{margin: '0 auto'}}>
                <Box sx={{
                    width: '100vw',
                    height: '100%',
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    {/* Product Name */}
                    <TextField
                        label="Nomi"
                        {...register('name', {required: 'Mahsulot nomini kiriting'})}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ''}
                    />

                    {/* Category */}
                    <Box>
                        <Controller
                            name="category"
                            control={control}
                            defaultValue={null}
                            rules={{required: 'Kategoriya tanlang'}} // Validation rule
                            render={({field, fieldState: {error}}) => (
                                <Autocomplete
                                    {...field}
                                    options={categories}
                                    fullWidth
                                    getOptionLabel={(option) => option.name}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    onOpen={() => {
                                        if (categories.length === 0) {
                                            getCategories('');
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Kategoriya"
                                            variant="outlined"
                                            error={!!error}
                                            helperText={error ? error.message : ''}
                                            onFocus={params.inputProps.onFocus}
                                        />
                                    )}
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props}>
                                            {option.name}
                                        </Box>
                                    )}
                                    onChange={(event, value) => {
                                        setValue('category', value, {shouldValidate: true});
                                    }}
                                    onInputChange={(event, newInputValue) => {
                                        getCategories(newInputValue);
                                    }}
                                />
                            )}
                        />
                    </Box>

                    {/* Price Input */}
                    <PriceInput
                        name="price"
                        control={control}
                        label="Narxi"
                        max={2147483647}
                        rules={{required: 'Narxni kiritish majburiy'}}
                    />

                    {/* Additional Info */}
                    <Controller
                        name="description"
                        control={control}
                        rules={{required: "Mahsulot haqida kiriting"}}
                        render={({field}) => (
                            <div className="quill-editor">
                                <ReactQuill
                                    value={field.value}
                                    onChange={field.onChange}
                                    theme="snow"
                                    modules={quillModules}
                                    placeholder="Mahsulot haqida kiriting"
                                />
                                {errors.description && (
                                    <div className="error-message">
                                        {errors.description.message}
                                    </div>
                                )}
                            </div>
                        )}
                    />
                </Box>
            </form>


        </Dialog>

    </div>);
}

export default Index;