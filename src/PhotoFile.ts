import type { TemporaryFile } from './TemporaryFile';
import { CameraPhotoCodec } from './VideoFile';

export interface TakePhotoOptions {
  /**
   * Indicates how photo quality should be prioritized against speed.
   *
   * * `"quality"` Indicates that photo quality is paramount, even at the expense of shot-to-shot time
   * * `"balanced"` Indicates that photo quality and speed of delivery are balanced in priority
   * * `"speed"` Indicates that speed of photo delivery is most important, even at the expense of quality
   *
   * @default "balanced"
   */
  qualityPrioritization?: 'quality' | 'balanced' | 'speed';
  /**
   * Whether the Flash should be enabled or disabled
   *
   * @default "auto"
   */
  flash?: 'on' | 'off' | 'auto';
  /**
   * Specifies whether red-eye reduction should be applied automatically on flash captures.
   *
   * @default false
   */
  enableAutoRedEyeReduction?: boolean;
  /**
   * Indicates whether still image stabilization will be employed when capturing the photo
   *
   * @default false
   */
  enableAutoStabilization?: boolean;
  /**
   * Specifies whether the photo output should use content aware distortion correction on this photo request.
   * For example, the algorithm may not apply correction to faces in the center of a photo, but may apply it to faces near the photo’s edges.
   *
   * @platform iOS
   * @default false
   */
  enableAutoDistortionCorrection?: boolean;
  /**
   * Specifies the photo codec to use for this capture. The provided photo codec has to be supported by the session.
   *
   * @platform iOS
   */
  photoCodec?: CameraPhotoCodec;
  /**
   * When set to `true`, metadata reading and mapping will be skipped. ({@linkcode PhotoFile.metadata} will be null)
   *
   * This might result in a faster capture, as metadata reading and mapping requires File IO.
   *
   * @default false
   *
   * @platform Android
   */
  skipMetadata?: boolean;
}

/**
 * Represents a Photo taken by the Camera written to the local filesystem.
 *
 * Related: {@linkcode Camera.takePhoto | Camera.takePhoto()}, {@linkcode Camera.takeSnapshot | Camera.takeSnapshot()}
 */
export interface PhotoFile extends TemporaryFile {
  width: number;
  height: number;
  isRawPhoto: boolean;
  thumbnail?: Record<string, unknown>;
  /**
   * Metadata information describing the captured image.
   *
   * @see [AVCapturePhoto.metadata](https://developer.apple.com/documentation/avfoundation/avcapturephoto/2873982-metadata)
   * @see [AndroidX ExifInterface](https://developer.android.com/reference/androidx/exifinterface/media/ExifInterface)
   */
  metadata?: {
    Orientation: number;
    /**
     * @platform iOS
     */
    DPIHeight: number;
    /**
     * @platform iOS
     */
    DPIWidth: number;
    /**
     * Represents any data Apple cameras write to the metadata
     *
     * @platform iOS
     */
    '{MakerApple}'?: Record<string, unknown>;
    '{TIFF}': {
      ResolutionUnit: number;
      Software: string;
      Make: string;
      DateTime: string;
      XResolution: number;
      /**
       * @platform iOS
       */
      HostComputer?: string;
      Model: string;
      YResolution: number;
    };
    '{Exif}': {
      DateTimeOriginal: string;
      ExposureTime: number;
      FNumber: number;
      LensSpecification: number[];
      ExposureBiasValue: number;
      ColorSpace: number;
      FocalLenIn35mmFilm: number;
      BrightnessValue: number;
      ExposureMode: number;
      LensModel: string;
      SceneType: number;
      PixelXDimension: number;
      ShutterSpeedValue: number;
      SensingMethod: number;
      SubjectArea: number[];
      ApertureValue: number;
      SubsecTimeDigitized: string;
      FocalLength: number;
      LensMake: string;
      SubsecTimeOriginal: string;
      OffsetTimeDigitized: string;
      PixelYDimension: number;
      ISOSpeedRatings: number[];
      WhiteBalance: number;
      DateTimeDigitized: string;
      OffsetTimeOriginal: string;
      ExifVersion: string;
      OffsetTime: string;
      Flash: number;
      ExposureProgram: number;
      MeteringMode: number;
    };
  };
}
