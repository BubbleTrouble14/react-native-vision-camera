//
// Created by Marc Rousavy on 09.08.23.
//

#pragma once

#include <jni.h>
#include <fbjni/fbjni.h>
#include <EGL/egl.h>

namespace vision {

using namespace facebook;

class SkiaPreviewView : public jni::HybridClass<SkiaPreviewView> {
 public:
  static auto constexpr kJavaDescriptor = "Lcom/mrousavy/camera/skia/SkiaPreviewView;";
  static jni::local_ref<jhybriddata> initHybrid(jni::alias_ref<jhybridobject> jThis);
  static void registerNatives();

 private:
  friend HybridBase;
  jni::global_ref<SkiaPreviewView::javaobject> javaPart_;
  EGLDisplay _display;
  EGLContext _context;

  void initOpenGL();
  void destroy();

  int createTexture();
  void destroyTexture(int textureId);

  explicit SkiaPreviewView(jni::alias_ref<SkiaPreviewView::jhybridobject> jThis): javaPart_(jni::make_global(jThis)) {}
};

class OpenGLError: public std::runtime_error {
 public:
  OpenGLError(const std::string&&);
};

} // namespace vision