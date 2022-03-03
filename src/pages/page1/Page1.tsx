import Box from '@mui/material/Box/Box';
import { styled } from '@mui/system';

import avatarHoverImage from '../../images/avatar-h.jpeg'

import twitterIcon from '../../images/twitter.svg'
import githubIcon from '../../images/github.svg'
import mediumIcon from '../../images/medium.svg'
import juejinIcon from '../../images/juejin.svg'

const CenterOuter = styled('div')({
    maxWidth: '1140px',
    margin: '0 auto',
    color: '#111',
    backgroundColor: '#fff',
});

const ITitle = styled('h1')({
    textAlign: 'center',
    margin: 0,
    padding: 0,
});

const ISubTitle = styled('h3')({
    textAlign: 'center',
    margin: 0,
    padding: 0,
});

const IText = styled('div')({
    textAlign: 'center',
});

const IAvatar = styled('div')({
    width: '235px',
    height: '235px',
    margin: '0 auto',
    background: `#eee url(${avatarHoverImage}) center center no-repeat`,
    filter: 'brightness(0.5) contrast(155%)',
    ":hover": {
        filter: 'none',
    },
    backgroundSize: 'cover',
    borderRadius: '50%',
});

const IAbout = styled('div')({
    maxWidth: '600px',
    width: '90vw',
    margin: '0 auto',
    color: '#fff',
    backgroundColor: '#4e5dab',
    padding: '20px',
});

export type SizedBoxProps = {
    width?: string,
    height?: string,
    children?: JSX.Element | JSX.Element[] | string
}

export const SizedBox = (props: SizedBoxProps)=>{
    const {width, height, children,} = props;
    return (
              <Box sx={{
                  width: width ?? 0,
                  height: height ?? 0,
                  display: 'inline-block',
              }}>
                  {children}
              </Box>
    )
}

export type SocialLinkProps = {
    image?: string,
    title?: string,
    path?: string,
}

export const SocialLink = (props: SocialLinkProps)=>{
    const {image, path,} = props;
    return (
            <a href={path} target="_blank" rel="noopener noreferrer">
                <Box sx={{
                    width: '24px',
                    height: '24px',
                    margin: '0 auto',
                    display: 'inline-block',
                    background: `url(${image}) center center no-repeat`,
                    ":hover": {
                        opacity: 0.7,
                    },
                    backgroundSize: 'cover',
                    borderRadius: '50%',
                }} />
            </a>
    )
}

const ILink = styled('a')({
    textDecoration: 'none',
    color: '#000',
    fontWeight: 'bold',
    position: 'relative',
    top: '-5px',
    textTransform: 'uppercase',
    ':active': {
        color: '#000',
    }
});

export const SocialLinkText = (props: SocialLinkProps)=>{
    const {title, path,} = props;
    return (
            <ILink href={path} target="_blank" rel="noopener noreferrer">
                {title}
            </ILink>
    )
}

const Page1 = ():JSX.Element=>{

    return (
        <>
            <Box style={{
                minHeight: '100vh',
                position: 'relative',
                paddingBottom: '118px',
            }}>
                <CenterOuter>
                    <SizedBox height='50px' />
                    <ITitle >Profile</ITitle>
                    <SizedBox height='30px' />
                    <IText>
                        I'm a full stack developer!
                    </IText>
                    <SizedBox height='30px' />
                    <IAvatar/>
                    <SizedBox height='30px' />
                    <IAbout>
                        <ITitle >About me</ITitle>
                        <IText>
                        I'm a full stack developer and I'm very interested in crypto right now, if you have some really cool ideas, you can contact me via the link below.
                        </IText>
                        <SizedBox height='10px' />
                    </IAbout>
                    <SizedBox height='30px' />
                    <ITitle >Details</ITitle>
                    <SizedBox height='5px' />
                    <ISubTitle >Name:</ISubTitle>
                    <IText>
                        Jobin Leung
                    </IText>
                    <SizedBox height='5px' />
                    <ISubTitle >Age:</ISubTitle>
                    <IText>
                        34
                    </IText>
                    <SizedBox height='5px' />
                    <ISubTitle >Location:</ISubTitle>
                    <IText>
                        Earth
                    </IText>
                    <SizedBox height='50px' />
                    <Box style={{
                        textAlign: 'center',
                    }}>
                        
                        <SocialLinkText title='blog' path="https://blog.jobinleung.me" />
                        <SizedBox width='10px' />
                        <SocialLink image={twitterIcon} path="https://twitter.com/jobinleung" />
                        <SizedBox width='10px' />
                        <SocialLink image={githubIcon} path="https://github.com/jobinleung" />
                        <SizedBox width='10px' />
                        <SocialLink image={mediumIcon} path="https://medium.com/@jobinleung" />
                        <SizedBox width='10px' />
                        <SocialLink image={juejinIcon} path="https://juejin.cn/user/729731451585319/posts" />
                    </Box>
                    <SizedBox height='50px' />
                </CenterOuter>

                <footer style={{
                    backgroundColor: '#333',
                    color: '#fff',
                    padding: '50px',
                    textAlign: 'center',
                    fontSize: '12px',
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                }}>
                  
                    <IText>
                        created by Jobin with ♥
                    </IText>

                </footer>
            </Box>
        </>
    );
}

export default Page1;