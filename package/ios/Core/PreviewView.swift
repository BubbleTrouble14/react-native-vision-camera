//
//  PreviewView.swift
//  VisionCamera
//
//  Created by Marc Rousavy on 30.11.22.
//  Copyright © 2022 mrousavy. All rights reserved.
//

import AVFoundation
import Foundation
import UIKit

class PreviewView: UIView {
  /**
   Convenience wrapper to get layer as its statically known type.
   */
  var videoPreviewLayer: AVCaptureVideoPreviewLayer {
    // swiftlint:disable force_cast
    return layer as! AVCaptureVideoPreviewLayer
    // swiftlint:enable force_cast
  }

  /**
   Gets or sets the resize mode of the PreviewView.
   */
  var resizeMode: ResizeMode = .cover {
    didSet {
      switch resizeMode {
      case .cover:
        videoPreviewLayer.videoGravity = .resizeAspectFill
      case .contain:
        videoPreviewLayer.videoGravity = .resizeAspect
      }
    }
  }

  override public class var layerClass: AnyClass {
    return AVCaptureVideoPreviewLayer.self
  }

  func layerRectConverted(fromMetadataOutputRect rect: CGRect) -> CGRect {
    return videoPreviewLayer.layerRectConverted(fromMetadataOutputRect: rect)
  }

  func captureDevicePointConverted(fromLayerPoint point: CGPoint) -> CGPoint {
    return videoPreviewLayer.captureDevicePointConverted(fromLayerPoint: point)
  }

  // TODO: TRY IF NEW API WORKS?
  private var newAPI = false

  func takeSnapshot() throws -> UIImage {
    if newAPI {
      // New API:
      let renderer = UIGraphicsImageRenderer(size: videoPreviewLayer.bounds.size)
      let image = renderer.image(actions: { context in
        videoPreviewLayer.render(in: context.cgContext)
      })
      return image
    } else {
      UIGraphicsBeginImageContextWithOptions(videoPreviewLayer.frame.size, false, 0)
      defer {
        UIGraphicsEndImageContext()
      }
      guard let context = UIGraphicsGetCurrentContext() else {
        throw CameraError.capture(.snapshotFailed)
      }

      videoPreviewLayer.render(in: context)

      guard let image = UIGraphicsGetImageFromCurrentImageContext() else {
        throw CameraError.capture(.snapshotFailed)
      }
      return image
    }
  }

  init(frame: CGRect, session: AVCaptureSession) {
    super.init(frame: frame)
    videoPreviewLayer.session = session
    videoPreviewLayer.videoGravity = .resizeAspectFill
  }

  @available(*, unavailable)
  required init?(coder _: NSCoder) {
    fatalError("init(coder:) is not implemented!")
  }
}
