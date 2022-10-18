import React from "react";
import {
  requireNativeComponent,
  Image,
  StyleSheet,
  ViewProps,
} from "react-native";

type OwnProps = {
  source: { uri: string } | number;
  loadingIndicatorSource: { uri: string } | number;
  fadeDuration: number;
  minimumZoomScale: number;
  maximumZoomScale: number;
  resizeMode:
    | "center"
    | "contain"
    | "cover"
    | "fitEnd"
    | "fitStart"
    | "stretch";
  scale: number;
  zoomTransitionDuration: number;
  onError: Function;
  onLoad: Function;
  onLoadEnd: Function;
  onLoadStart: Function;
  onProgress: Function;
  onScale: Function;
  onTap: Function;
  onViewTap: Function;
  showsHorizontalScrollIndicator: boolean;
  showsVerticalScrollIndicator: boolean;
} & ViewProps;

export default class PhotoView extends React.PureComponent<OwnProps> {
  render() {
    const {
      onError,
      onLoad,
      onLoadEnd,
      onLoadStart,
      onProgress,
      onScale,
      onTap,
      onViewTap,
      source: _source,
      loadingIndicatorSource: _loadingIndicatorSource,
      style: _style,
      ...props
    } = this.props;

    const source = Image.resolveAssetSource(_source);
    const loadingIndicatorSource = Image.resolveAssetSource(
      _loadingIndicatorSource
    );

    if (source && source.uri) {
      const { width, height, ...src } = source;
      const style = StyleSheet.flatten([{ width, height }, _style]);

      const nativeProps = {
        onPhotoViewerError: onError,
        onPhotoViewerLoad: onLoad,
        onPhotoViewerLoadEnd: onLoadEnd,
        onPhotoViewerLoadStart: onLoadStart,
        onPhotoViewerProgress: onProgress,
        onPhotoViewerScale: onScale,
        onPhotoViewerTap: onTap,
        onPhotoViewerViewTap: onViewTap,
        ...props,
        style,
        src,
        loadingIndicatorSrc:
          (loadingIndicatorSource && loadingIndicatorSource.uri) || null,
      };

      return <RNPhotoView {...nativeProps} />;
    }
    return null;
  }
}

const cfg = {
  nativeOnly: {
    onPhotoViewerError: true,
    onPhotoViewerLoad: true,
    onPhotoViewerLoadEnd: true,
    onPhotoViewerLoadStart: true,
    onPhotoViewerProgress: true,
    onPhotoViewerScale: true,
    onPhotoViewerTap: true,
    onPhotoViewerViewTap: true,
    src: true,
    loadingIndicatorSrc: true,
  },
};

export const RNPhotoView = requireNativeComponent("RNPhotoView");
