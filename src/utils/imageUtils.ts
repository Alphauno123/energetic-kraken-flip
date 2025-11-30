"use client";

export const getGenericPlaceholderUrl = (): string => "/placeholder.svg";

export const getStylePreviewImageUrl = (styleId: string): string => {
  // For demonstration, we'll use the same placeholder but with a unique query param
  // to simulate different images and prevent browser caching issues for identical URLs.
  return `/placeholder.svg?style=${styleId}`;
};