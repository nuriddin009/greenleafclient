import React, {useEffect, useState} from 'react';
import {Box, Button, InputAdornment, TextField} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Pagination from "@mui/material/Pagination";
import ReactPlayer from 'react-player/youtube';
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {useForm} from "react-hook-form";
import instance from "../../../utils/instance.js";
import EmptyTableData from "../../../components/emptydata/EmptyTableData.jsx";
import YouTubeVideoPlayer from "../../../components/video/YouTubeVideoPlayer.jsx";

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

// https://www.npmjs.com/package/react-social-media-embed

function Index(props) {
    const [open, setOpen] = useState(false)
    const [videos, setVideos] = useState([])
    const [video, setVideo] = useState(null)
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getVideos(0, '')
    }, []);


    const {register, handleSubmit, reset, formState: {errors}} = useForm();


    const getVideos = (page, search) => {
        instance.get('/v1/video', {params: {page, search}}).then(res => {
            setVideos(res.data.elements)
            setTotalPages(res.data?.requestPage?.pageLimit)
        })
    }

    const handleCloseModal = () => {
        reset({
            url: '',
            description: ''
        })
        setOpen(false);
    };
    const handleClickOpenModal = () => {
        setOpen(true);
    };

    const submitForm = (data) => {
        if (video) {
            instance.put(`/v1/video/${video?.id}`, data).then(res => {
                getVideos(0, '')
                handleCloseModal()
            })
        } else {
            instance.post('/v1/video', data).then(res => {
                getVideos(0, '')
                handleCloseModal()
            })
        }
    }

    const deleteVideo = (id) => {
        if (window.confirm(`Videoni o'chirmoqchimisiz?`)) {
            instance.delete('/v1/video', {params: {id}}).then(res => {
                getVideos(0, '')
            })
        }

    }
    const onPageChange = (page) => {
        setPage(page)
        getVideos(page - 1, search)
    }

    const updateVideo = (video) => {
        setVideo(video)
        reset({url: video?.url, description: video?.description})
        handleClickOpenModal()
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
        getVideos(0, e.target.value)
    }


    return (
        <div className={'video'}>
            <Button
                variant='text' size='large'
                color='success'
                startIcon={<PlayCircleIcon/>}
            >Videolar</Button>



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
                videos.length === 0 ? <EmptyTableData
                    message="Videolar mavjud emas"
                    onActionClick={handleClickOpenModal}
                    actionLabel="Yangi qo'shish"
                /> : <div>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 700}} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell sx={{background: '#4caf50', color: '#fff'}}>Video</StyledTableCell>
                                    <StyledTableCell align="left">Sana</StyledTableCell>
                                    <StyledTableCell align="left">{"Qo'shimcha"}</StyledTableCell>
                                    <StyledTableCell align="right">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {videos.map((video, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell component="th" scope="row">
                                            <YouTubeVideoPlayer
                                              videoUrl={video?.url}
                                              description={video?.description}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="left">{new Date(video?.createdAt).toLocaleString()}</StyledTableCell>
                                        <StyledTableCell align="left">{video?.description}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <StyledIconButton>
                                                <CreateIcon color={'primary'} onClick={() => updateVideo(video)}/>
                                            </StyledIconButton>

                                            <StyledIconButton>
                                                <DeleteOutlineIcon color={'error'}
                                                                   onClick={() => deleteVideo(video?.id)}/>
                                            </StyledIconButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}

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
                            Video
                        </Typography>
                        <Button
                            color="inherit"
                            type='submit'
                            form='v_form'>
                            Saqlash
                        </Button>
                    </Toolbar>
                </AppBar>


                <form id='v_form' onSubmit={handleSubmit(submitForm)} style={{margin: '0 auto'}}>
                    <Box sx={{
                        width: '100vw',
                        height: '100%',
                        padding: '1rem',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: '1.5rem'
                    }}>
                        <TextField
                            label="Video link"
                            fullWidth
                            {...register('url', {
                                required: 'Video link is required'
                            })}
                            error={!!errors.url}
                            helperText={errors.url ? errors.url.message : ''}
                        />

                        <TextField
                            label="Qo'shimcha"
                            multiline
                            rows={5}
                            fullWidth
                            {...register('description', {
                                required: "Qo'shimcha malumot kiriting"
                            })}
                            error={!!errors.description}
                            helperText={errors.description ? errors.description.message : ''}
                        />
                    </Box>
                </form>

            </Dialog>


        </div>
    );
}

export default Index;