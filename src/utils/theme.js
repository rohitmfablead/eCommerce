import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 813;
const scale = (size) => width / guidelineBaseWidth * size;
const verticalScale = (size) => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };

// export const Fonts = {
//     Bold: 'DMSans_18pt-Bold',
//     SemiBold: 'PDMSans_18pt-SemiBold',
//     Medium: 'DMSans_18pt-Medium',
//     Regular: 'DMSans_18pt-Regular'
// }

export const Colors = {
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    NATURAL_BLACK: '#757575',
    TEXT: '#404040',
    RED:"#E9494F",
    PRIMARY_COLOR: '#156651',
    SECONDARY_COLOR: '#EBB65B',
    BORDER:"#9E9E9E"
}

export const DEVICE_STYLES = {
    SCREEN_WIDTH: width,
    SCREEN_HEIGHT: height,
}

export const DEVICE_STYLES_WITH_STATUSBAR = Dimensions.get('screen');